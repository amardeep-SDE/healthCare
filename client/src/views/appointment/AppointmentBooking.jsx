// src/views/appointment/AppointmentBooking.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiVideo,
  FiMapPin,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser, FaQrcode } from "react-icons/fa";
import { DOCTOR_INFO, HEALTH_CONCERNS } from "../../data/homeopathyData";
import { useBookAppointmentMutation } from "../../hooks/useAppointmentsQuery";
import { useAuthStore } from "../../store/useAuthStore";
import { formatCurrency } from "../../utils/formatters";

// Memoized Slot Button to prevent re-rendering all buttons on single slot click
const SlotButton = memo(({ time, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(time)}
    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 ${
      selected
        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
    }`}
  >
    {time}
  </button>
));
SlotButton.displayName = "SlotButton";

export const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const bookMutation = useBookAppointmentMutation();

  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("Online Video"); // "Online Video" | "In-Clinic Visit"
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [selectedConcern, setSelectedConcern] = useState("Skin & Eczema");

  // Form State
  const [patientDetails, setPatientDetails] = useState({
    name: user?.name || "Ananya Sharma",
    phone: user?.phone || "+91 98765 11223",
    email: user?.email || "ananya.sharma@example.com",
    age: "26",
    gender: "Female",
    symptoms: "Dry red patches and nighttime itching on neck and hands.",
    duration: "2 Months",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // "upi" | "card"
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Generate next 7 days for booking tab - Memoized
  const availableDates = useMemo(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
        dayNumber: d.getDate(),
        month: d.toLocaleDateString("en-IN", { month: "short" }),
      });
    }
    return dates;
  }, []);

  const morningSlots = useMemo(
    () => ["10:00 AM", "10:45 AM", "11:30 AM", "12:15 PM"],
    []
  );

  const eveningSlots = useMemo(
    () => ["04:30 PM", "05:15 PM", "06:00 PM", "06:45 PM"],
    []
  );

  // Callbacks
  const handleSlotSelect = useCallback((time) => {
    setSelectedSlot(time);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFinalBooking = async () => {
    const payload = {
      patientName: patientDetails.name,
      patientPhone: patientDetails.phone,
      patientEmail: patientDetails.email,
      patientAge: Number(patientDetails.age) || 26,
      patientGender: patientDetails.gender,
      date: selectedDate,
      timeSlot: selectedSlot,
      mode: mode,
      concern: selectedConcern,
      symptoms: patientDetails.symptoms,
      fee: DOCTOR_INFO.consultationFee,
      paymentMethod: paymentMethod === "upi" ? "UPI (Instant)" : "Credit/Debit Card",
    };

    try {
      const result = await bookMutation.mutateAsync(payload);
      setConfirmedBooking(result);
      setIsConfirmed(true);
    } catch (err) {
      // handled by mutation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Doctor Header Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 dark:border-gray-700 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={DOCTOR_INFO.avatar}
            alt={DOCTOR_INFO.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-lg border-2 border-indigo-500"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
              <FiShield className="text-sm" /> Verified BHMS Consultant • Reg: {DOCTOR_INFO.regNo}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {DOCTOR_INFO.name}
            </h1>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              {DOCTOR_INFO.qualification} • {DOCTOR_INFO.experience}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              📍 {DOCTOR_INFO.clinicName}, {DOCTOR_INFO.clinicAddress}
            </p>
          </div>
          <div className="text-center sm:text-right bg-indigo-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-indigo-100 dark:border-gray-600">
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Consultation Fee</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {formatCurrency(DOCTOR_INFO.consultationFee)}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
              ✓ Free Follow-up in 7 days
            </span>
          </div>
        </div>

        {/* Wizard Steps Progress */}
        {!isConfirmed && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 -z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 transition-all duration-300 -z-0"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />

              {[
                { s: 1, label: "Mode & Time" },
                { s: 2, label: "Patient Case" },
                { s: 3, label: "Payment & Confirm" },
              ].map(({ s, label }) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step >= s
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-500 border-2 border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {step > s ? "✓" : s}
                  </div>
                  <span className="text-xs font-semibold mt-2 text-gray-700 dark:text-gray-300 hidden sm:block">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {isConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100 dark:border-emerald-900 text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
              <FiCheckCircle />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
              Payment & Slot Confirmed
            </span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-3">
              Consultation Booked Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto text-sm">
              Booking confirmation and doctor appointment slip have been sent to{" "}
              <strong className="text-gray-900 dark:text-white">{patientDetails.phone}</strong>.
            </p>

            <div className="bg-indigo-50/70 dark:bg-gray-700/50 rounded-2xl p-6 max-w-md mx-auto mt-6 text-left border border-indigo-100 dark:border-gray-600 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Booking ID:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {confirmedBooking?.id || "DRR-8419"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date & Slot:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedDate} • {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Mode:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Patient:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {patientDetails.name} ({patientDetails.gender}, {patientDetails.age} yrs)
                </span>
              </div>
              <div className="flex justify-between border-t border-indigo-200 dark:border-gray-600 pt-2">
                <span className="text-gray-500 dark:text-gray-400">Consultation Fee Paid:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(DOCTOR_INFO.consultationFee)} (Receipt Generated)
                </span>
              </div>
            </div>

            {mode.includes("Online") && (
              <div className="mt-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 max-w-md mx-auto text-left flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                    <FiVideo className="text-indigo-600 text-sm" /> Tele-Consultation Room Ready
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Dr. Rashi will be available in the in-app room at your slot.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/consultation/${confirmedBooking?.id || "DRR-101"}`)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow transition hover:scale-105 whitespace-nowrap"
                >
                  Enter Room
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => navigate("/my-appointments")}
                className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition"
              >
                View in My Appointments
              </button>
              <button
                onClick={() => navigate("/patient/dashboard")}
                className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Go to Health Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          /* Multi-step Form Card */
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            {/* Step 1: Mode & Time */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Step 1: Choose Consultation Mode
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Select how you would like to consult with Dr. Rashi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setMode("Online Video")}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 ${
                      mode === "Online Video"
                        ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                    }`}
                  >
                    <div className="p-3 bg-indigo-600 text-white rounded-xl text-xl">
                      <FiVideo />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Online Video Consult</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        High-quality video call via Google Meet. Perfect for outstation patients.
                      </p>
                      <span className="inline-block mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {formatCurrency(DOCTOR_INFO.consultationFee)}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setMode("In-Clinic Visit")}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 ${
                      mode === "In-Clinic Visit"
                        ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                    }`}
                  >
                    <div className="p-3 bg-emerald-600 text-white rounded-xl text-xl">
                      <FaHospitalUser />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">In-Clinic Physical Visit</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Visit Dr. Rashi's clinic directly. Priority queue with pre-booked slot.
                      </p>
                      <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(DOCTOR_INFO.consultationFee)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiCalendar className="text-indigo-600" /> Select Appointment Date
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-7">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.fullDate;
                      return (
                        <button
                          key={item.fullDate}
                          type="button"
                          onClick={() => setSelectedDate(item.fullDate)}
                          className={`p-3 min-w-[70px] sm:min-w-0 flex-shrink-0 sm:flex-shrink rounded-2xl text-center border transition-all ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20 scale-105"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400"
                          }`}
                        >
                          <span className="block text-[11px] uppercase tracking-wider font-semibold opacity-80">
                            {item.dayName}
                          </span>
                          <span className="block text-lg font-black my-0.5">{item.dayNumber}</span>
                          <span className="block text-[10px] opacity-75">{item.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slots Selection */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiClock className="text-indigo-600" /> Select Available Time Slot
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                        ☀️ Morning Consultations
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {morningSlots.map((time) => (
                          <SlotButton
                            key={time}
                            time={time}
                            selected={selectedSlot === time}
                            onSelect={handleSlotSelect}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
                        🌙 Evening Consultations
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {eveningSlots.map((time) => (
                          <SlotButton
                            key={time}
                            time={time}
                            selected={selectedSlot === time}
                            onSelect={handleSlotSelect}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition hover:scale-105"
                  >
                    Next: Patient Details <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Patient Case Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Step 2: Patient Health Intake
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Homeopathy analyzes the individual as a whole. Please share your symptoms.
                  </p>
                </div>

                {/* Primary Concern Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
                    Primary Health Concern
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {HEALTH_CONCERNS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedConcern(c.name)}
                        className={`p-3 rounded-xl border text-left transition ${
                          selectedConcern === c.name
                            ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-600 text-indigo-900 dark:text-indigo-200"
                            : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300"
                        }`}
                      >
                        <span className="text-lg block mb-1">{c.icon}</span>
                        <span className="text-xs font-bold block">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={patientDetails.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={patientDetails.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Age & Gender *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={patientDetails.age}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm dark:text-white outline-none"
                      />
                      <select
                        name="gender"
                        value={patientDetails.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm dark:text-white outline-none"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      How long have you had this issue?
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="e.g. 2 months, 1 year"
                      value={patientDetails.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Describe your chief complaints & symptoms
                  </label>
                  <textarea
                    rows={3}
                    name="symptoms"
                    value={patientDetails.symptoms}
                    onChange={handleInputChange}
                    placeholder="Describe sensations, what makes it better or worse, previous treatments taken..."
                    className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiArrowLeft /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition hover:scale-105"
                  >
                    Next: Payment & Review <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment & Summary */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Step 3: Consultation Summary & Instant Payment
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Confirm your slot and complete payment to finalize your booking with Dr. Rashi.
                  </p>
                </div>

                {/* Booking Recap Card */}
                <div className="bg-indigo-50/50 dark:bg-gray-700/40 rounded-2xl p-5 border border-indigo-100 dark:border-gray-600 grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Consultation:</span>
                    <span className="font-bold text-gray-900 dark:text-white text-base">
                      {mode} with Dr. Rashi Shrivastava
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 block mt-1">
                      📅 {selectedDate} at {selectedSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">Patient Name:</span>
                    <span className="font-bold text-gray-900 dark:text-white text-base">
                      {patientDetails.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                      Concern: {selectedConcern} ({patientDetails.duration})
                    </span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-3">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod("upi")}
                      className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition ${
                        paymentMethod === "upi"
                          ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <FaQrcode className="text-2xl text-indigo-600" />
                      <div>
                        <span className="font-bold text-sm block text-gray-900 dark:text-white">
                          UPI (GPay / PhonePe / Paytm / QR)
                        </span>
                        <span className="text-xs text-gray-500">Fast & Zero processing fee</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition ${
                        paymentMethod === "card"
                          ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <FiShield className="text-2xl text-indigo-600" />
                      <div>
                        <span className="font-bold text-sm block text-gray-900 dark:text-white">
                          Credit / Debit Card / NetBanking
                        </span>
                        <span className="text-xs text-gray-500">All major Indian banks supported</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-b border-gray-100 dark:border-gray-700 py-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Doctor Consultation Fee:</span>
                    <span>{formatCurrency(DOCTOR_INFO.consultationFee)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Digital Prescription & Case Filing:</span>
                    <span className="text-emerald-600 font-semibold">FREE (₹0)</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span>Total Payable:</span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(DOCTOR_INFO.consultationFee)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiArrowLeft /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalBooking}
                    disabled={bookMutation.isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {bookMutation.isPending ? "Processing Payment..." : `Pay ${formatCurrency(DOCTOR_INFO.consultationFee)} & Confirm`}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;

