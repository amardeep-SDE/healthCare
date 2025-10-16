import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaUserMd } from "react-icons/fa";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      date: "2025-07-10",
      time: "11:30 AM",
      doctor: "Dr. Rashi Shrivastava",
      specialization: "Dermatologist",
      fee: 500,
      status: "Pending",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
    {
      id: "2",
      date: "2025-07-12",
      time: "2:00 PM",
      doctor: "Dr. Rashi Shrivastava",
      specialization: "Dermatologist",
      fee: 500,
      status: "Paid",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },
  ]);

  const handlePayment = (id) => {
    // Simulate payment success
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "Paid" } : appt
      )
    );
    toast.success("✅ Payment Successful! Your appointment is confirmed.");
  };

  const handleCancel = (id) => {
    setAppointments((prev) => prev.map((appt) => appt.id === id ? { ...appt, status: "Cancelled" } : appt));
    toast("⚠️ Appointment Cancelled", { icon: "⚠️" });
  };

  return (
    <section className="px-6 sm:px-10 md:px-24 py-16 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-12 text-gray-800 text-center">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No appointments booked yet.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="group relative flex flex-col sm:flex-row bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl rounded-3xl p-6 sm:p-8 items-center border border-gray-200 transition-all duration-500 hover:scale-[1.02]"
            >
              <img
                src={appt.image}
                alt={appt.doctor}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-4 border-indigo-100 group-hover:scale-110 transition-transform duration-300"
              />

              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                  <FaUserMd className="text-indigo-600" /> {appt.doctor}
                </h3>
                <p className="text-sm text-gray-500">{appt.specialization}</p>

                <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-3">
                  <span className="flex items-center gap-1 text-sm bg-indigo-50 px-3 py-1 rounded-full text-indigo-700">
                    <FaCalendarAlt /> {appt.date}
                  </span>
                  <span className="flex items-center gap-1 text-sm bg-pink-50 px-3 py-1 rounded-full text-pink-700">
                    <FaClock /> {appt.time}
                  </span>
                  <span className="flex items-center gap-1 text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">
                    <FaMoneyBillWave /> ₹{appt.fee}
                  </span>
                </div>

                <span
                  className={`inline-block mt-3 px-4 py-1 rounded-full text-xs font-bold shadow-sm ${appt.status === "Paid"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                >
                  {appt.status}
                </span>
              </div>

              <div className="flex flex-col sm:ml-6 mt-4 sm:mt-0 gap-3">
                {appt.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handlePayment(appt.id)}
                      className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Pay Now
                    </button>
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="px-6 py-2 rounded-full border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
