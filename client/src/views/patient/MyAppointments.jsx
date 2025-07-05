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
    <section className="px-6 sm:px-10 md:px-24 py-16 bg-[#f8fafc] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Appointments</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex flex-col sm:flex-row bg-white shadow-lg rounded-xl p-4 space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-between"
          >
            <img
              src={appt.image}
              alt={appt.doctor}
              className="w-24 h-24 object-cover rounded-xl border"
            />
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800">{appt.doctor}</h3>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {appt.date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> {appt.time}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fee:</strong> ₹{appt.fee}
              </p>
              <p
                className={`text-sm font-medium ${
                  appt.status === "Paid" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {appt.status}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              {appt.status !== "Paid" && (
                <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-indigo-700 transition">
                  Pay Now
                </button>
              )}
              <button className="text-red-500 hover:underline text-sm">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointments;
