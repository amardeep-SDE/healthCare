import React from "react";
import { PopupButton } from "react-calendly";

const Appointment = () => {
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

        {/* Doctor Info and Calendly Button */}
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
          <p className="mb-8 font-medium text-gray-900 text-lg">
            Appointment Fee: <span className="text-indigo-600">₹500</span>
          </p>

          {/* Calendly Popup Button */}
          <PopupButton
            url="https://calendly.com/amardeepdwivedi1016/consultation-with-dr-rashi-shrivastava"
            rootElement={document.getElementById("root")}
            text="Book Appointment"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
