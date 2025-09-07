import React from "react";

const appointments = [
  {
    id: "1",
    date: "2025-07-10",
    time: "11:30 AM",
    doctor: "Dr. Rashi Shrivastava",
    fee: 500,
    status: "Pending",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    id: "2",
    date: "2025-07-12",
    time: "2:00 PM",
    doctor: "Dr. Rashi Shrivastava",
    fee: 500,
    status: "Paid",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
];

const MyAppointments = () => {
  return (
    <section className="px-6 sm:px-10 md:px-24 py-16 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        My Appointments
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="group relative flex flex-col sm:flex-row bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl rounded-2xl p-6 space-y-4 sm:space-y-0 sm:space-x-6 items-center transition-all duration-300 border border-gray-100"
          >
            {/* Doctor Image */}
            <img
              src={appt.image}
              alt={appt.doctor}
              className="w-24 h-24 object-cover rounded-2xl border-2 border-indigo-100 group-hover:scale-105 transition-transform duration-300"
            />

            {/* Info Section */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900">
                {appt.doctor}
              </h3>
              <p className="text-sm text-gray-600">
                📅 <strong>{appt.date}</strong>
              </p>
              <p className="text-sm text-gray-600">
                ⏰ <strong>{appt.time}</strong>
              </p>
              <p className="text-sm text-gray-600">
                💰 Fee: <strong>₹{appt.fee}</strong>
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  appt.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appt.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-2">
              {appt.status !== "Paid" && (
                <button className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Pay Now
                </button>
              )}
              <button className="text-red-500 hover:text-red-600 text-sm font-medium transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointments;
