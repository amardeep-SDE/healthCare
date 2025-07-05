import React from "react";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-800">Amardeep</h4>
          <p className="text-sm text-gray-500">Patient ID: #123456</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FiMail /> amardeep@example.com
        </p>
        <p className="flex items-center gap-2">
          <FiPhone /> +91 99999 99999
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
