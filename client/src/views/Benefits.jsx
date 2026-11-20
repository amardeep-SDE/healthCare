// src/views/Benefits.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiFileText,
  FiTruck,
  FiArrowRight,
  FiStar,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";
import { FaUserMd, FaQuoteLeft } from "react-icons/fa";

const treatmentSteps = [
  {
    step: "01",
    title: "Book & Digital Intake",
    desc: "Choose an online video slot or physical visit. Upload your existing blood tests, prescription slips, or skin photos via our encrypted health locker.",
    icon: <FiCalendar className="text-indigo-600 dark:text-indigo-400" />,
  },
  {
    step: "02",
    title: "30-Min In-Depth Diagnosis",
    desc: "Dr. Rashi analyzes your constitutional traits, thermal preference (chilly/hot), food cravings, and psychological stressors to find the simillimum.",
    icon: <FaUserMd className="text-purple-600 dark:text-purple-400" />,
  },
  {
    step: "03",
    title: "Dispensary Dispatch & Live Tracking",
    desc: "Original homeopathic medicated globules shipped to your address with BlueDart tracking. Log your daily symptom recovery (1-10) in the Patient Portal.",
    icon: <FiTruck className="text-emerald-600 dark:text-emerald-400" />,
  },
];

const patientTransformations = [
  {
    name: "Ananya Sharma",
    age: 26,
    location: "Bhopal, MP",
    condition: "Atopic Eczema & Sensitive Skin",
    improvement: "70% in 4 Weeks",
    duration: "Active Care",
    remedy: "Graphites 200CH + Calendula",
    quote:
      "I suffered from severe dry redness and nighttime itching on my elbows for 2 years. Allopathic steroid creams kept causing rebound flares. Within 3 weeks of Dr. Rashi's constitutional doses, my skin softened completely and sleep is back!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Rajesh Mehra",
    age: 42,
    location: "Indore, MP",
    condition: "Chronic Acidity & GERD",
    improvement: "85% in 3 Weeks",
    duration: "Completed",
    remedy: "Nux Vomica 30C + Carbo Veg",
    quote:
      "I was popping daily antacid capsules just to survive post-lunch burning. Dr. Rashi identified my sedentary schedule and dietary sensitivity. The homeopathic drops brought immediate soothing without a single chemical pill.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Pooja & Master Aarav (6 yrs)",
    age: 32,
    location: "Jabalpur, MP",
    condition: "Recurrent Child Cold & Wheezing",
    improvement: "90% This Season",
    duration: "Preventive Care",
    remedy: "Tuberculinum 200 + Calc Phos",
    quote:
      "Every weather change used to mean nebulizer masks and antibiotic courses for my son. Dr. Rashi's sweet sugar pills boosted Aarav's natural chest resistance so well that he hasn't missed a single school day this winter!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
];

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-indigo-50/20 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* 1. How It Works: 3-Step Journey */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              The Healing Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              How Your Consultation &{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Recovery Works
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              A transparent, supportive healthcare journey combining ancient homeopathic depth with modern digital ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative rounded-3xl bg-white dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/30 font-mono">
                      {step.step}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-2xl shadow-inner">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/50 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Real Patient Case Transformations */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Verified Case Logs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Real Patient Stories &{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Documented Recovery
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Explore how constitutional homeopathy transformed lives with zero toxicity and lasting wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {patientTransformations.map((patient, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-3xl bg-white dark:bg-slate-800/70 border border-gray-200/80 dark:border-slate-700/80 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300"
              >
                <div>
                  {/* Top Quote Icon & Recovery Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-300 dark:text-indigo-700 text-2xl">
                      <FaQuoteLeft />
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                      <FiTrendingUp /> {patient.improvement}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed italic mb-6">
                    "{patient.quote}"
                  </p>

                  {/* Remedy Used Tag */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200/80 dark:border-slate-700 text-[11px] text-gray-600 dark:text-gray-300 mb-6">
                    <span className="font-bold text-gray-900 dark:text-white block">Prescribed Simillimum:</span>
                    <span>{patient.remedy}</span>
                  </div>
                </div>

                {/* Patient Profile Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {patient.name} ({patient.age} yrs)
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {patient.location} • <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{patient.condition}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition hover:scale-105"
            >
              Start Your Own Recovery Journey (₹500) <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Benefits;
