import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

const AppointmentCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-gray-100">
      {/* Left: Doctor Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full">
          <FiUser className="text-indigo-600 text-xl" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">
            Consultation with Dr. Rashi
          </h4>
          <p className="text-sm text-gray-500">Issue: Migraine</p>
        </div>
      </div>

      {/* Right: Date & Time */}
      <div className="flex flex-col items-end gap-2">
        <span className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          <FiCalendar className="text-base" /> 15 Aug 2025
        </span>
        <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <FiClock className="text-base" /> 4:00 PM
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;
