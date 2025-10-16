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
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 flex flex-col lg:flex-row gap-10 border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
        {/* Doctor Image */}
        <div className="flex flex-col items-center lg:items-start gap-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor"
            className="w-48 h-48 rounded-2xl object-cover bg-indigo-50 p-4 border border-gray-200 shadow-md"
          />
        </div>

        {/* Doctor Info and Booking */}
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Dr. Rashi Shrivastava{" "}
            <span className="text-blue-600 text-lg">✔</span>
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            BHMS - Homeopathy | <span className="font-medium">5+ Years Experience</span>
          </p>

          {/* About */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-700 mb-1 flex items-center gap-1">
              About <span className="text-gray-400">ℹ️</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dr. Rashi is committed to holistic healing through homeopathy. Her
              approach emphasizes natural remedies, deep listening, and
              customized care plans for both acute and chronic conditions.
            </p>
          </div>

          {/* Fee */}
          <p className="mb-6 font-medium text-gray-900 text-lg">
            Appointment Fee: <span className="text-indigo-600">₹500</span>
          </p>

          {/* Day Slots */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Select a Day</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {days.map((day) => (
                <button
                  key={day.label}
                  onClick={() => setSelectedDay(day.label)}
                  className={`flex flex-col items-center px-4 py-2 rounded-xl text-sm min-w-[60px] font-medium shadow-sm transition-all ${
                    selectedDay === day.label
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span>{day.label}</span>
                  <span className="text-xs">{day.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-2">Select a Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`text-sm px-4 py-2 rounded-full font-medium border transition-all ${
                    selectedTime === time
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
