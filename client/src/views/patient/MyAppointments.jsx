import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaUserMd,
} from "react-icons/fa";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      date: "2025-07-10",
      time: "11:30 AM",
      doctor: "Dr. Rashi Shrivastava",
      specialization: "Homeopathic Consultant",
      fee: 500,
      status: "Pending",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
    {
      id: "2",
      date: "2025-07-12",
      time: "2:00 PM",
      doctor: "Dr. Rashi Shrivastava",
      specialization: "Homeopathic Consultant",
      fee: 500,
      status: "Paid",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
  ]);

  const handlePayment = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Paid" } : a))
    );
    toast.success("Payment successful. Appointment confirmed.");
  };

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
    toast("Appointment cancelled", { icon: "⚠️" });
  };

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 md:px-14 py-12 bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] dark:bg-[radial-gradient(circle_at_top,_#111827,_#020617_70%)]">
      
      {/* soft glow */}
      <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-indigo-400/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 bg-cyan-400/20 blur-3xl rounded-full" />

      <h2 className="relative text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No appointments booked yet.
        </p>
      ) : (
        <div className="relative max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-700 rounded-3xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all"
            >
              {/* status badge */}
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  appt.status === "Paid"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    : appt.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}
              >
                {appt.status}
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={appt.image}
                  alt={appt.doctor}
                  className="w-24 h-24 rounded-2xl bg-indigo-50 dark:bg-gray-800 p-3 shadow-md group-hover:scale-105 transition"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                    <FaUserMd className="text-indigo-600" />
                    {appt.doctor}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {appt.specialization}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="flex items-center gap-1 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                      <FaCalendarAlt /> {appt.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full">
                      <FaClock /> {appt.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                      <FaMoneyBillWave /> ₹{appt.fee}
                    </span>
                  </div>
                </div>
              </div>

              {appt.status === "Pending" && (
                <div className="mt-6 flex gap-3 justify-center sm:justify-end">
                  <button
                    onClick={() => handlePayment(appt.id)}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md hover:scale-105 transition"
                  >
                    Pay Now
                  </button>
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-red-500 border border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/40 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
