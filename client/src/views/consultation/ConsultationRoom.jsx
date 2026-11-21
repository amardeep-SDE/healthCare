// src/views/consultation/ConsultationRoom.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiPhoneOff,
  FiMessageSquare,
  FiShare2,
  FiFileText,
  FiSend,
  FiPaperclip,
  FiMaximize2,
  FiMinimize2,
  FiShield,
  FiClock,
  FiCheck,
  FiUser,
} from "react-icons/fi";
import { FaUserMd, FaPills, FaHeartbeat } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useAppointmentsQuery } from "../../hooks/useAppointmentsQuery";
import { PrescriptionPadModal } from "../doctor/PrescriptionPadModal";
import { socket, connectSocket, disconnectSocket } from "../../services/socket";
import { api } from "../../services/api";
import toast from "react-hot-toast";

// Memoized Chat Bubble
const ChatMessage = memo(({ msg, isSelf }) => (
  <div className={`flex flex-col ${isSelf ? "items-end" : "items-start"} space-y-1`}>
    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
      <span className="font-bold">{msg.sender}</span>
      <span>• {msg.time}</span>
    </div>
    <div
      className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
        isSelf
          ? "bg-indigo-600 text-white rounded-br-xs"
          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-xs"
      }`}
    >
      {msg.text}
      {msg.attachment && (
        <div className="mt-2 p-2 rounded-xl bg-black/10 dark:bg-black/20 flex items-center gap-2 text-xs">
          <FiPaperclip />
          <span className="font-mono truncate">{msg.attachment}</span>
        </div>
      )}
    </div>
  </div>
));
ChatMessage.displayName = "ChatMessage";

export const ConsultationRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isDoctor } = useAuthStore();
  const { data: appointments = [] } = useAppointmentsQuery();

  const isDoc = isDoctor();

  // Find appointment details or fallback
  const appointment = useMemo(() => {
    return (
      appointments.find((a) => a.id === id) || {
        id: id || "DRR-101",
        patientName: "Ananya Sharma",
        concern: "Atopic Eczema & Sensitive Skin",
        symptoms: "Dry red patches on neck and elbows.",
      }
    );
  }, [appointments, id]);

  // Video & Audio Controls State
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // In-Call Chat Messages State
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Rashi Shrivastava",
      time: "11:30 AM",
      text: "Namaste Ananya! Can you hear and see me clearly? How is the skin itching on your hands and neck today?",
    },
    {
      id: 2,
      sender: "Ananya Sharma",
      time: "11:31 AM",
      text: "Hello Doctor! Yes, audio and video are crystal clear. The itching is about 60% better, but yesterday after eating sour curd I had mild redness.",
    },
    {
      id: 3,
      sender: "Dr. Rashi Shrivastava",
      time: "11:32 AM",
      text: "Remember, in Homeopathy sour foods like curd and pickles can act as antidotes to Graphites. Please avoid them for the next 7 days.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const chatBottomRef = useRef(null);

  // Call Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // Real-time Socket Connection & In-Call Chat Synchronization
  useEffect(() => {
    const s = connectSocket();
    const currentRoom = appointment.id || "DRR-101";

    s.emit("join_room", {
      room: currentRoom,
      user: {
        name: user?.name || (isDoc ? "Dr. Rashi Shrivastava" : "Ananya Sharma"),
        role: user?.role || (isDoc ? "doctor" : "patient"),
      },
    });

    // Fetch initial chat messages from backend if available
    api.fetchChatMessages(currentRoom).then((backendMsgs) => {
      if (Array.isArray(backendMsgs) && backendMsgs.length > 0) {
        setMessages((prev) => {
          const combined = [...backendMsgs];
          return combined;
        });
      }
    });

    s.on("receive_message", (incomingMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === incomingMsg.id || (m._id && m._id === incomingMsg._id))) {
          return prev;
        }
        return [...prev, incomingMsg];
      });
    });

    s.on("user_joined", ({ user: joinedUser, message }) => {
      if (joinedUser?.name !== user?.name) {
        toast(message || "Participant joined the consultation", { icon: "👋" });
      }
    });

    return () => {
      s.off("receive_message");
      s.off("user_joined");
      disconnectSocket();
    };
  }, [appointment.id, user, isDoc]);

  const handleSendMessage = useCallback(
    (e) => {
      e?.preventDefault();
      if (!inputMessage.trim()) return;

      const currentRoom = appointment.id || "DRR-101";
      const senderName = user?.name || (isDoc ? "Dr. Rashi Shrivastava" : "Ananya Sharma");
      const senderRole = isDoc ? "doctor" : "patient";
      const newMsg = {
        id: Date.now(),
        appointmentCode: currentRoom,
        sender: senderName,
        senderRole,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: inputMessage,
      };

      setMessages((prev) => [...prev, newMsg]);
      setInputMessage("");

      // Broadcast over real-time WebSockets
      socket.emit("send_message", { room: currentRoom, message: newMsg });

      // Persist to MongoDB backend
      api.sendChatMessage(newMsg);
    },
    [inputMessage, user?.name, isDoc, appointment.id]
  );

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to conclude this consultation?")) {
      toast.success("Consultation ended. Clinical summary saved.");
      if (isDoc) {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    }
  };

  const handleSimulateAttachment = () => {
    const newMsg = {
      id: Date.now(),
      sender: user?.name || "Ananya Sharma",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: "Attached is the latest photo of my skin patch for your examination.",
      attachment: "clinical_skin_patch_review.jpg (1.4 MB)",
    };
    setMessages((prev) => [...prev, newMsg]);
    toast.success("Photo attachment shared with doctor!");
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-950 text-white flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <div className="bg-gray-900/90 backdrop-blur-md px-6 py-3 border-b border-gray-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
              Tele-Consultation Room • {appointment.id}
            </h2>
            <p className="text-[11px] text-gray-400">
              {isDoc ? `Patient: ${appointment.patientName} (${appointment.concern})` : `Consultant: Dr. Rashi Shrivastava (BHMS)`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-mono font-bold text-emerald-400">
            <FiClock /> {formatTimer(callDuration)}
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gray-400 bg-gray-800/80 px-2.5 py-1 rounded-full border border-gray-700">
            <FiShield className="text-emerald-400" /> End-to-End Encrypted
          </span>
        </div>
      </div>

      {/* Main Video & Chat Split Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Video Area */}
        <div className="flex-1 flex flex-col bg-black relative overflow-hidden justify-between p-4">
          {/* Main Video Feed (Other Participant) */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center">
            {/* Simulation Video Background */}
            <img
              src={
                isDoc
                  ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80" // Patient (Ananya)
                  : "https://images.unsplash.com/photo-1594824813637-4b7264a856be?auto=format&fit=crop&w=1200&q=80" // Doctor (Dr. Rashi)
              }
              alt="Live Video Feed"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Video Overlay Name Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-xs font-semibold border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isDoc ? `${appointment.patientName} (Live)` : `Dr. Rashi Shrivastava (Consultant)`}
              </span>
            </div>

            {/* Floating Self-Preview (PiP) */}
            <div className="absolute bottom-4 right-4 w-28 sm:w-48 aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-gray-800 border-2 border-indigo-500/80 shadow-2xl">
              {isVideoOn ? (
                <img
                  src={
                    isDoc
                      ? "https://images.unsplash.com/photo-1594824813637-4b7264a856be?auto=format&fit=crop&w=400&q=80"
                      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  }
                  alt="Self Camera Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500 text-xs">
                  <FiVideoOff size={20} className="mb-1" />
                  Camera Off
                </div>
              )}
              <span className="absolute bottom-1 left-2 text-[10px] font-bold bg-black/60 px-1.5 py-0.5 rounded text-white">
                You {!isMicOn && "(Muted)"}
              </span>
            </div>
          </div>

          {/* Bottom Dock Controls */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-3 z-20 flex-wrap">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition shadow-lg ${
                isMicOn
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
              title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {isMicOn ? <FiMic size={18} /> : <FiMicOff size={18} />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition shadow-lg ${
                isVideoOn
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
              title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {isVideoOn ? <FiVideo size={18} /> : <FiVideoOff size={18} />}
            </button>

            <button
              onClick={() => {
                setIsScreenSharing(!isScreenSharing);
                toast(isScreenSharing ? "Screen sharing stopped" : "Sharing clinical screen...", {
                  icon: "🖥️",
                });
              }}
              className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition shadow-lg hidden sm:block ${
                isScreenSharing
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              title="Share Screen / Reports"
            >
              <FiShare2 size={18} />
            </button>

            {/* Doctor In-Call Prescription Button */}
            {isDoc && (
              <button
                onClick={() => setIsRxModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg transition hover:scale-105"
              >
                <FaPills /> <span className="hidden sm:inline">Write</span> Rx Pad
              </button>
            )}

            {/* Toggle Chat Drawer */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl transition shadow-lg ${
                isChatOpen
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              title="Toggle In-Call Chat"
            >
              <FiMessageSquare size={18} />
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-lg flex items-center gap-1.5 font-bold px-3 sm:px-6"
            >
              <FiPhoneOff size={18} />
              <span className="hidden sm:inline">End Call</span>
            </button>
          </div>
        </div>

        {/* Right: Live Chat & Clinical Exchange Drawer */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed md:relative inset-y-0 right-0 z-30 w-full sm:w-96 bg-gray-900 border-l border-gray-800 flex flex-col h-full shadow-2xl"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/60">
                <div className="flex items-center gap-2">
                  <FiMessageSquare className="text-indigo-400" />
                  <h3 className="font-bold text-sm text-white">Live Consultation Chat</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                >
                  <FiMinimize2 size={16} />
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m) => (
                  <ChatMessage
                    key={m.id}
                    msg={m}
                    isSelf={m.sender.toLowerCase().includes(user?.name?.toLowerCase() || (isDoc ? "dr" : "ananya"))}
                  />
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input & File Sharing */}
              <div className="p-3 border-t border-gray-800 bg-gray-900/80">
                {/* Doctor Quick Presets */}
                {isDoc && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setInputMessage("Take Graphites 200CH 4 pills twice daily on empty tongue.")}
                      className="px-2 py-1 rounded-lg bg-gray-800 text-indigo-300 hover:bg-gray-700 whitespace-nowrap"
                    >
                      + Graphites 200CH
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMessage("Strictly avoid raw onion, raw garlic, and strong coffee.")}
                      className="px-2 py-1 rounded-lg bg-gray-800 text-amber-300 hover:bg-gray-700 whitespace-nowrap"
                    >
                      + Dietary Warning
                    </button>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateAttachment}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
                    title="Share Symptom Photo / Lab Report"
                  >
                    <FiPaperclip size={18} />
                  </button>

                  <input
                    type="text"
                    placeholder="Type message to doctor..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow"
                  >
                    <FiSend size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* In-Call Prescription Pad Modal (Dr. Rashi) */}
      <PrescriptionPadModal
        isOpen={isRxModalOpen}
        onClose={() => setIsRxModalOpen(false)}
        appointment={appointment}
      />
    </div>
  );
};

export default ConsultationRoom;

