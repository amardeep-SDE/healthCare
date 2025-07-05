// components/FancyButton.jsx
import React from "react";

const FancyButton = ({ label = "Book Now", icon = null }) => {
  return (
    <button
      className="relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-indigo-500 px-7 py-3 text-indigo-700 font-semibold group hover:animate-wiggle transition-all duration-300 bg-white"
    >
      {/* Icon (optional) */}
      {icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{label}</span>

      {/* Shine effect */}
      <span className="absolute left-[-100%] top-[-50%] h-[200%] w-12 rotate-45 bg-green-400 opacity-40 group-hover:animate-shine z-0"></span>
    </button>
  );
};

export default FancyButton;
