import React from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

const AppointmentCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800">Consultation with Dr. Rashi</h4>
        <p className="text-sm text-gray-500">Issue: Migraine</p>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p className="flex items-center justify-end gap-1"><FiCalendar /> 15 Aug 2025</p>
        <p className="flex items-center justify-end gap-1"><FiClock /> 4:00 PM</p>
      </div>
    </div>
  );
};

export default AppointmentCard;
