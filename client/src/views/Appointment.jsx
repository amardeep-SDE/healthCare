import React, { useState } from "react";

const Appointment = () => {
  const [selectedDay, setSelectedDay] = useState("SAT");
  const [selectedTime, setSelectedTime] = useState("11:30 am");

  const days = [
    { label: "WED", date: "4" },
    { label: "THU", date: "5" },
    { label: "FRI", date: "6" },
    { label: "SAT", date: "7" },
    { label: "SUN", date: "8" },
    { label: "MON", date: "9" },
    { label: "TUE", date: "10" },
  ];

  const times = ["10:00 am", "12:00 pm", "01:00 pm", "02:00 pm"];

  return (
    <section className="min-h-screen bg-white px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 flex flex-col lg:flex-row gap-10">
      {/* <div>
      <h1 className="text-3xl font-bold text-gray-800">Book an Appointment </h1>

      </div> */}
        {/* Doctor Image */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor"
            className="w-56 h-56 rounded-xl object-cover bg-indigo-100 p-4 "
          />
        </div>

        {/* Doctor Info and Booking */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">
            Dr. Rashi Shrivastava <span className="text-blue-600">✓</span>
          </h2>
          <p className="text-gray-600 text-sm">BHMS - Homeopathy | 5+ Years</p>

          <div className="mt-4">
            <p className="font-semibold text-gray-700 mb-1">
              About <span className="text-gray-500">ℹ️</span>
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dr. Rashi is committed to holistic healing through homeopathy. Her
              approach emphasizes natural remedies, deep listening, and
              customized care plans for both acute and chronic health
              conditions.
            </p>
          </div>

          <p className="mt-4 font-medium text-gray-800">
            Appointment Fee: ₹500
          </p>

          {/* Day Slots */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Booking slots</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {days.map((day) => (
                <button
                  key={day.label}
                  onClick={() => setSelectedDay(day.label)}
                  className={`flex flex-col items-center px-3 py-2 rounded-xl border text-sm min-w-[50px] ${
                    selectedDay === day.label
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <span>{day.label}</span>
                  <span className="text-xs">{day.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`text-sm px-3 py-2 rounded-full border transition ${
                  selectedTime === time
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
