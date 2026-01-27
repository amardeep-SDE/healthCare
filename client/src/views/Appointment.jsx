import React from "react";
import { PopupButton } from "react-calendly";

const Appointment = () => {
  const root =
    typeof window !== "undefined"
      ? document.getElementById("root")
      : null;

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 md:px-14 py-10 bg-[radial-gradient(circle_at_top,_#e0e7ff,_#ffffff_65%)] dark:bg-[radial-gradient(circle_at_top,_#111827,_#020617_65%)]">

      {/* Background glow (contained, no scroll) */}
      <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-indigo-400/25 blur-3xl rounded-full"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 bg-cyan-400/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-5xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-700 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-7 sm:p-9 flex flex-col lg:flex-row gap-9">

        {/* Doctor Card */}
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start gap-5">
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              alt="Dr Rashi"
              className="w-44 h-44 rounded-3xl object-cover bg-indigo-50 dark:bg-gray-800 p-4 shadow-xl"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] px-3 py-1 rounded-full shadow-md">
              Verified Doctor
            </span>
          </div>

          <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              No Side Effects
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              Personalized Care
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
              Safe for All Ages
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Dr. Rashi Shrivastava
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            BHMS • Homeopathic Consultant • 5+ Years Experience
          </p>

          <div className="mt-4 border-l-4 border-indigo-500 pl-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Dr. Rashi provides holistic homeopathic treatment focused on
              identifying root causes and offering safe, personalized, and
              long-term healing for patients of all ages.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Consultation Fee
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹500
              </p>
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-300 dark:bg-gray-700"></div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              ⏰ Mon – Sat <br />
              10:00 AM – 7:00 PM
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7">
            <PopupButton
              url="https://calendly.com/amardeepdwivedi1016/consultation-with-dr-rashi-shrivastava"
              rootElement={root}
              text="Book Consultation"
              className="inline-flex items-center justify-center px-9 py-3.5 text-base sm:text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-[0_10px_35px_rgba(79,70,229,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Instant confirmation • Secure booking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
