// src/views/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiShield,
  FiVideo,
  FiMapPin,
  FiStar,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { FaUserMd, FaPills, FaLeaf, FaHeartbeat } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  const typewriterWords = Array.isArray(t("hero.typewriter", { returnObjects: true }))
    ? t("hero.typewriter", { returnObjects: true })
    : [
        "Dr. Rashi Shrivastava",
        "Classical Homeopathy",
        "Zero Side-Effects",
        "Constitutional Care",
      ];

  return (
    <section
      id="HeroSection"
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-sky-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300 py-12 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Badges, Value Props & CTAs (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Top Pill: Doctor Verification & Credential */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60 shadow-sm text-xs font-semibold text-indigo-700 dark:text-indigo-300"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("hero.badge") || "Dr. Rashi Shrivastava • BHMS Certified Classical Homeopath"}</span>
              <span className="hidden sm:inline-block text-gray-300 dark:text-gray-600">|</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <FiCheckCircle size={13} /> {t("hero.verified") || "Verified Clinic"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-950 dark:text-white leading-[1.15] tracking-tight">
              {t("hero.headline1") || "Gentle Root-Cause"}{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-300">
                {t("hero.headlineHighlight") || "Healing With"}
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-indigo-600 dark:text-indigo-400 font-serif italic">
                <Typewriter
                  key={i18n.language}
                  words={typewriterWords}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1800}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {t("hero.description") ||
                "Specialized in chronic skin disorders (eczema & psoriasis), stubborn hair fall, gastric acidity, and women's hormonal balance. Treat the root cause with individual constitutional micro-potencies—not temporary steroid suppression."}
            </p>

            {/* Quick Consultation Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-xs font-medium text-indigo-800 dark:text-indigo-200">
                <FiVideo className="text-indigo-600 dark:text-indigo-400" /> {t("hero.videoConsult") || "Pan-India Video Consult"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-xs font-medium text-emerald-800 dark:text-emerald-200">
                <FiMapPin className="text-emerald-600 dark:text-emerald-400" /> {t("hero.inClinic") || "In-Clinic Visit (Indore/Bhopal)"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900 text-xs font-medium text-amber-800 dark:text-amber-200">
                <FaLeaf className="text-amber-600 dark:text-amber-400" /> {t("hero.nonToxic") || "100% Non-Toxic & Steroid Free"}
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                to="/appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FiCalendar className="text-lg" />
                <span>{t("hero.bookBtn") || "Book Video Consultation"} (₹200)</span>
                <FiArrowUpRight className="text-lg" />
              </Link>

              <Link
                to="/medicines"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold text-sm border border-gray-200 dark:border-slate-700 shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaPills className="text-indigo-600 dark:text-indigo-400" />
                <span>{t("hero.exploreBtn") || "Dispensary & Care Kits"}</span>
                <FiArrowRight />
              </Link>
            </div>

            {/* Real Social Proof Micro-Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-gray-200/80 dark:border-slate-800 w-full">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Patient"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Patient"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Patient"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <FiStar className="fill-amber-400" />
                    <FiStar className="fill-amber-400" />
                    <FiStar className="fill-amber-400" />
                    <FiStar className="fill-amber-400" />
                    <FiStar className="fill-amber-400" />
                    <span className="font-bold text-gray-900 dark:text-white ml-1">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {i18n.language?.startsWith("hi") ? "500+ स्वस्थ मरीज़ों का भरोसा" : "From 500+ Recovered Patients"}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-[1px] bg-gray-200 dark:bg-slate-800" />

              <div className="text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {i18n.language?.startsWith("hi") ? "अगला उपलब्ध स्लॉट" : "Next Available Slot"}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <FiClock size={12} /> {i18n.language?.startsWith("hi") ? "आज सुबह 11:30 बजे (ऑनलाइन / क्लिनिक)" : "Today at 11:30 AM (Online / Clinic)"}
                </p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: High Aesthetic Doctor Showcase Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 -rotate-2" />

            {/* Doctor Profile Showcase Box */}
            <div className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-6">
              
              {/* Image Frame with Badges */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4] bg-gradient-to-b from-indigo-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 shadow-inner">
                <img
                  src="/doctor-rashi.jpg"
                  alt="Dr. Rashi Shrivastava BHMS"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Doctor Name Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      Dr. Rashi Shrivastava <FiCheckCircle className="text-emerald-400" />
                    </h3>
                    <p className="text-[11px] text-indigo-200">BHMS • Classical Homoeopath</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-[10px] font-bold">
                    Reg. Certified
                  </span>
                </div>
              </div>

              {/* Floating Highlight Feature 1: Clinical Success Rate */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-center">
                  <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">96.4%</span>
                  <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">Positive Prognosis</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-center">
                  <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400">500+</span>
                  <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
                    {i18n.language?.startsWith("hi") ? "मरीज़ों का उपचार" : "Cases Treated"}
                  </span>
                </div>
              </div>

              {/* Live Patient Progress Snapshot Teaser */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/60 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                  <FaHeartbeat size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-gray-900 dark:text-white truncate">Avg. Eczema Recovery</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">70% in 4 wks</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-[70%]" />
                  </div>
                </div>
              </div>

              {/* Direct Instant Action */}
              <Link
                to="/patient/dashboard"
                className="block text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                Already a registered patient? Open Patient Portal →
              </Link>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
