// sockets/consultationSocket.js

export const setupConsultationSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected to Tele-Consultation Socket: ${socket.id}`);

    // Join room for a specific consultation
    socket.on("join_room", ({ room, user }) => {
      socket.join(room);
      console.log(`👤 User ${user?.name || "Participant"} joined room: ${room}`);

      // Notify others in room
      socket.to(room).emit("user_joined", {
        user,
        message: `${user?.name || "Participant"} has entered the consultation room.`,
      });
    });

    // Real-time Chat Messaging
    socket.on("send_message", ({ room, message }) => {
      // Broadcast message to everyone in the room (including sender or to others)
      io.to(room).emit("receive_message", message);
    });

    // Typing Indicators
    socket.on("typing", ({ room, sender }) => {
      socket.to(room).emit("user_typing", { sender });
    });

    socket.on("stop_typing", ({ room }) => {
      socket.to(room).emit("user_stop_typing");
    });

    // WebRTC Video Signaling
    socket.on("call_user", ({ room, offer, callerName }) => {
      socket.to(room).emit("incoming_call", { offer, callerName });
    });

    socket.on("answer_call", ({ room, answer }) => {
      socket.to(room).emit("call_accepted", { answer });
    });

    socket.on("ice_candidate", ({ room, candidate }) => {
      socket.to(room).emit("ice_candidate", { candidate });
    });

    socket.on("end_call", ({ room }) => {
      socket.to(room).emit("call_ended");
    });

    socket.on("disconnect", () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};
