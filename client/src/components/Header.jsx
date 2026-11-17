// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart, FiUser, FiRefreshCw, FiEye, FiUsers, FiPackage } from "react-icons/fi";
import { FaUserMd, FaNotesMedical, FaPills } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, isDoctor, switchRole } = useAuthStore();
  const { getCartCount, setIsCartOpen } = useCartStore();

  const cartCount = getCartCount();
  const isDoc = isDoctor();

  const navLinkClasses = (path) =>
    `cursor-pointer pb-1 transition-all border-b-2 text-xs sm:text-sm font-semibold ${
      location.pathname === path
        ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
        : "text-gray-800 dark:text-gray-200 border-transparent hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <section
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3"
          : "bg-gradient-to-b from-indigo-50/90 via-purple-50/60 to-white/90 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-4"
      }`}
    >
      <header className="flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link to={isDoc ? "/doctor/dashboard" : "/"} className="flex items-center gap-2.5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Dr. Rashi Homeopathy"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg leading-tight">
              Dr. Rashi
            </span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
              {isDoc ? "Super Admin • Clinic Suite" : "BHMS • Homeo Clinic"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Strict Role Separation */}
        <nav className="hidden lg:flex items-center gap-6">
          {isDoc ? (
            /* DOCTOR (SUPER ADMIN) NAVIGATION */
            <>
              <Link to="/doctor/dashboard" className={navLinkClasses("/doctor/dashboard")}>
                <span className="flex items-center gap-1.5">
                  <FaUserMd className="text-indigo-600" /> Clinic Control
                </span>
              </Link>
              <Link to="/doctor/patients" className={navLinkClasses("/doctor/patients")}>
                <span className="flex items-center gap-1.5">
                  <FiUsers className="text-indigo-600" /> Patient Directory (EMR)
                </span>
              </Link>
              <Link to="/doctor/orders" className={navLinkClasses("/doctor/orders")}>
                <span className="flex items-center gap-1.5">
                  <FaPills className="text-indigo-600" /> Dispensary & Orders
                </span>
              </Link>
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition"
                title="Preview public clinic portal as visitor"
              >
                <FiEye /> Preview Website
              </Link>
            </>
          ) : (
            /* PATIENT NAVIGATION */
            <>
              <Link to="/" className={navLinkClasses("/")}>
                {t("nav.home") || "Home"}
              </Link>
              <Link to="/appointment" className={navLinkClasses("/appointment")}>
                {t("nav.bookAppointment") || "Book Consultation"}
              </Link>
              <Link to="/medicines" className={navLinkClasses("/medicines")}>
                Dispensary Store
              </Link>
              <Link to="/patient/dashboard" className={navLinkClasses("/patient/dashboard")}>
                Patient Portal
              </Link>
              <Link to="/patient/profile" className={navLinkClasses("/patient/profile")}>
                Medical Profile
              </Link>
              <Link to="/my-appointments" className={navLinkClasses("/my-appointments")}>
                My Visits
              </Link>
              <Link to="/orders" className={navLinkClasses("/orders")}>
                Track Orders
              </Link>
            </>
          )}
        </nav>

        {/* Right Side Tools & Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Quick Demo Role Switcher */}
          <button
            onClick={() => switchRole(isDoc ? "patient" : "doctor")}
            title="Toggle between Dr. Rashi (Doctor Super Admin) and Patient view"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition ${
              isDoc
                ? "bg-purple-100 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300"
                : "bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
            }`}
          >
            <FiRefreshCw className="text-[10px]" />
            <span>Mode: {isDoc ? "Dr. Rashi (Super Admin)" : "Patient (Ananya)"}</span>
          </button>

          {/* Cart Icon Button (For Dispensary) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Dispensary Cart"
          >
            <FiShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <ThemeToggle />

          {/* Language Toggle */}
          <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-full text-xs">
            <button
              onClick={() => switchLanguage("en")}
              className={`font-semibold ${i18n.language === "en" ? "text-indigo-600 font-bold" : "text-gray-500"}`}
            >
              EN
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              onClick={() => switchLanguage("hi")}
              className={`font-semibold ${i18n.language === "hi" ? "text-indigo-600 font-bold" : "text-gray-500"}`}
            >
              हिन्दी
            </button>
          </div>

          {/* User profile / Logout */}
          <Link
            to={isDoc ? "/doctor/dashboard" : "/patient/profile"}
            className="flex items-center gap-2 pl-1 hover:opacity-80 transition"
            title={isDoc ? "Doctor Command Center" : "View Medical Profile"}
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1594824813637-4b7264a856be?auto=format&fit=crop&w=200&q=80"}
              alt={user?.name}
              className={`w-8 h-8 rounded-full object-cover border-2 ${
                isDoc ? "border-purple-500" : "border-indigo-400"
              }`}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-gray-700 dark:text-gray-200"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="p-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md flex flex-col p-6 space-y-6 text-gray-900 dark:text-white z-50 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <AiOutlineClose size={26} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Role: {isDoc ? "Dr. Rashi (Super Admin)" : "Patient Mode"}
            </span>
            <button
              onClick={() => {
                switchRole(isDoc ? "patient" : "doctor");
                setIsMenuOpen(false);
              }}
              className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-600 text-white"
            >
              Switch Role
            </button>
          </div>

          <div className="flex flex-col space-y-4 text-base font-semibold">
            {isDoc ? (
              <>
                <Link to="/doctor/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Clinic Control
                </Link>
                <Link to="/doctor/patients" onClick={() => setIsMenuOpen(false)}>
                  Patient Directory (EMR)
                </Link>
                <Link to="/doctor/orders" onClick={() => setIsMenuOpen(false)}>
                  Dispensary & Orders
                </Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Preview Website
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/appointment" onClick={() => setIsMenuOpen(false)}>
                  Book Consultation
                </Link>
                <Link to="/medicines" onClick={() => setIsMenuOpen(false)}>
                  Dispensary Store
                </Link>
                <Link to="/patient/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Patient Dashboard
                </Link>
                <Link to="/patient/profile" onClick={() => setIsMenuOpen(false)}>
                  Medical Profile
                </Link>
                <Link to="/my-appointments" onClick={() => setIsMenuOpen(false)}>
                  My Appointments
                </Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
                  Track Orders
                </Link>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <ThemeToggle />
            <div className="flex gap-2 text-sm font-semibold">
              <button onClick={() => switchLanguage("en")}>EN</button>
              <span>|</span>
              <button onClick={() => switchLanguage("hi")}>हिन्दी</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
