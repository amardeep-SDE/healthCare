import React from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Header with Avatar */}
      <div className="flex items-center space-x-4 pb-5 border-b border-gray-100">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="User"
            className="w-16 h-16 rounded-full object-cover border-4 border-indigo-100"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800">Amardeep</h4>
          <p className="text-sm text-gray-500">Patient ID: #123456</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-5 space-y-3 text-sm">
        <p className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
          <FiMail className="text-indigo-500" /> amardeep@example.com
        </p>
        <p className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
          <FiPhone className="text-green-500" /> +91 99999 99999
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
