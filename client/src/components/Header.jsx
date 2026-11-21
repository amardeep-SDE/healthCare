// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiUser,
  FiRefreshCw,
  FiUsers,
  FiPackage,
  FiCalendar,
  FiPhoneCall,
  FiCheckCircle,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";
import { FaUserMd, FaPills, FaLeaf, FaHeartbeat } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, isDoctor, switchRole } = useAuthStore();
  const { getCartCount, setIsCartOpen } = useCartStore();

  const cartCount = getCartCount();
  const isDoc = isDoctor();

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("i18nextLng", lang);
    } catch (e) {}
  };

  const navLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? "text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 font-bold shadow-xs"
        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100/60 dark:hover:bg-slate-800/60"
    }`;
  };

  return (
    <section
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-gray-200/80 dark:border-slate-800 py-2.5"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-slate-900 py-3.5"
      }`}
    >
      <header className="flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
        
        {/* 1. Left: Brand Identity (Clinic Logo) */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <FaLeaf className="text-lg" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[7px] font-black text-white">
              ✓
            </span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-gray-950 dark:text-white text-base sm:text-lg leading-tight tracking-tight">
                Dr. Rashi
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[9px] font-extrabold uppercase">
                BHMS
              </span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              {isDoc ? "Doctor Admin Suite" : "Homeopathic Tele-Clinic"}
            </span>
          </div>
        </Link>

        {/* 2. Middle: Desktop Navigation (Strict Role Separation) */}
        <nav className="hidden lg:flex items-center gap-1">
          {isDoc ? (
            /* DOCTOR (SUPER ADMIN) NAVIGATION */
            <>
              <Link to="/" className={navLinkStyle("/")}>
                {t("nav.home") || "Home"}
              </Link>
              <Link to="/doctor/dashboard" className={navLinkStyle("/doctor/dashboard")}>
                <FaUserMd className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.clinicControl") || "Clinic Control"}</span>
              </Link>
              <Link to="/doctor/patients" className={navLinkStyle("/doctor/patients")}>
                <FiUsers className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.patientEMR") || "Patient EMR"}</span>
              </Link>
              <Link to="/doctor/orders" className={navLinkStyle("/doctor/orders")}>
                <FaPills className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.dispensaryDispatch") || "Dispensary Dispatch"}</span>
              </Link>
            </>
          ) : (
            /* PATIENT NAVIGATION */
            <>
              <Link to="/" className={navLinkStyle("/")}>
                {t("nav.home") || "Home"}
              </Link>
              <Link to="/appointment" className={navLinkStyle("/appointment")}>
                <FiCalendar className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.bookConsult") || "Book Consult"}</span>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
              </Link>
              <Link to="/medicines" className={navLinkStyle("/medicines")}>
                <FaPills className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.dispensary") || "Dispensary"}</span>
              </Link>
              <Link to="/patient/dashboard" className={navLinkStyle("/patient/dashboard")}>
                <FiActivity className="text-indigo-600 dark:text-indigo-400 text-xs" />
                <span>{t("nav.healthMeter") || "Health Meter"}</span>
              </Link>
              <Link to="/patient/profile" className={navLinkStyle("/patient/profile")}>
                <span>{t("nav.medicalProfile") || "Medical Profile"}</span>
              </Link>
              <Link to="/my-appointments" className={navLinkStyle("/my-appointments")}>
                <span>{t("nav.myVisits") || "My Visits"}</span>
              </Link>
            </>
          )}
        </nav>

        {/* 3. Right: Interactive Tools & Role Mode Switcher */}
        <div className="hidden md:flex items-center space-x-2.5">
          
          {/* Quick Demo Mode Pill Switcher */}
          <button
            onClick={() => switchRole(isDoc ? "patient" : "doctor")}
            title="Click to toggle between Doctor Super Admin and Patient mode"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition shadow-2xs hover:scale-102 active:scale-98 ${
              isDoc
                ? "bg-purple-50 dark:bg-purple-950/80 border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-300"
                : "bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
            }`}
          >
            <FiRefreshCw className="text-[11px]" />
            <span>Mode: {isDoc ? (t("nav.modeDoctor") || "Dr. Rashi") : (t("nav.modePatient") || "Patient")}</span>
          </button>

          {/* Dispensary Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            aria-label="Dispensary Cart"
            title="View Dispensary Cart"
          >
            <FiShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1 border border-gray-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => switchLanguage("en")}
              className={`transition ${
                i18n.language?.startsWith("en") ? "text-indigo-600 font-extrabold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              EN
            </button>
            <span className="text-gray-300 dark:text-slate-700">|</span>
            <button
              onClick={() => switchLanguage("hi")}
              className={`transition ${
                i18n.language?.startsWith("hi") ? "text-indigo-600 font-extrabold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Active User Avatar & Profile Direct Access */}
          <Link
            to={isDoc ? "/doctor/dashboard" : "/patient/profile"}
            className="flex items-center gap-2 pl-1.5 group"
            title={isDoc ? "Doctor Admin Dashboard" : "View Patient Health Locker"}
          >
            <div className="relative">
              <img
                src={
                  isDoc
                    ? "/doctor-rashi.jpg"
                    : user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
                alt={user?.name || "Active User"}
                className={`w-9 h-9 rounded-full object-cover border-2 shadow-sm transition group-hover:ring-2 ${
                  isDoc
                    ? "border-purple-500 group-hover:ring-purple-400"
                    : "border-indigo-500 group-hover:ring-indigo-400"
                }`}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900" />
            </div>
            <div className="hidden xl:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[100px]">
                {isDoc ? "Dr. Rashi" : user?.name || "Ananya S."}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {isDoc ? "Super Admin" : "Active Patient"}
              </span>
            </div>
          </Link>

        </div>

        {/* 4. Mobile Trigger Icons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="p-2 rounded-xl text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>

      </header>

      {/* 5. Mobile Slide-Over Drawer using Portal to prevent backdrop-blur containment */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <div className="fixed inset-0 z-[99999] lg:hidden">
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Slide Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col p-6 space-y-6 text-gray-900 dark:text-white overflow-y-auto"
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
                        DR
                      </div>
                      <div>
                        <span className="font-bold text-sm block">Dr. Rashi Homeopathy</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">BHMS Certified Clinic</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition"
                      aria-label="Close navigation menu"
                    >
                      <AiOutlineClose size={22} />
                    </button>
                  </div>

                  {/* Current Active Mode Banner */}
                  <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Logged in Mode:</span>
                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                        {isDoc ? `🩺 ${t("nav.modeDoctor") || "Dr. Rashi"}` : `👤 ${t("nav.modePatient") || "Patient"}`}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        switchRole(isDoc ? "patient" : "doctor");
                        setIsMenuOpen(false);
                      }}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 transition"
                    >
                      {t("nav.switchRole") || "Switch Role"}
                    </button>
                  </div>

                  {/* Mobile Nav Links */}
                  <div className="flex flex-col space-y-2 font-semibold text-sm">
                    {isDoc ? (
                      <>
                        <Link
                          to="/"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          {t("nav.home") || "Home"}
                        </Link>
                        <Link
                          to="/doctor/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 transition"
                        >
                          <FaUserMd /> {t("nav.clinicControl") || "Clinic Control"}
                        </Link>
                        <Link
                          to="/doctor/patients"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FiUsers /> {t("nav.patientEMR") || "Patient EMR"}
                        </Link>
                        <Link
                          to="/doctor/orders"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FaPills /> {t("nav.dispensaryDispatch") || "Dispensary Dispatch"}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          {t("nav.home") || "Home"}
                        </Link>
                        <Link
                          to="/appointment"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-between transition"
                        >
                          <span className="flex items-center gap-2.5">
                            <FiCalendar /> {t("nav.bookConsult") || "Book Consult"}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                            ₹500
                          </span>
                        </Link>
                        <Link
                          to="/medicines"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FaPills /> {t("nav.dispensary") || "Dispensary"}
                        </Link>
                        <Link
                          to="/patient/dashboard"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FiActivity /> {t("nav.healthMeter") || "Health Meter"}
                        </Link>
                        <Link
                          to="/patient/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FiUser /> {t("nav.medicalProfile") || "Medical Profile"}
                        </Link>
                        <Link
                          to="/my-appointments"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FiCalendar /> {t("nav.myVisits") || "My Visits"}
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsMenuOpen(false)}
                          className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5 transition"
                        >
                          <FiPackage /> {t("nav.trackOrders") || "Track Orders"}
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Footer inside drawer */}
                  <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <ThemeToggle />
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <button
                        onClick={() => switchLanguage("en")}
                        className={`px-3 py-1.5 rounded-lg transition ${
                          i18n.language?.startsWith("en") ? "bg-indigo-600 text-white font-bold shadow-xs" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        English
                      </button>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <button
                        onClick={() => switchLanguage("hi")}
                        className={`px-3 py-1.5 rounded-lg transition ${
                          i18n.language?.startsWith("hi") ? "bg-indigo-600 text-white font-bold shadow-xs" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        हिन्दी
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </section>
  );
};

export default Header;
