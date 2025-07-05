import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ThemeToggle from "./ThemeToggle ";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("HeroSection");

  const { t, i18n } = useTranslation();

  const navLinkClasses = (section) =>
    `cursor-pointer pb-1 transition-all border-b-2 ${
      activeSection === section
        ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
        : "text-gray-900 dark:text-white border-transparent hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400"
    }`;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <section
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md"
          : "bg-gradient-to-b from-blue-100 via-purple-100 to-purple-200 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
      }`}
    >
      <header className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Dr. Rashi Logo"
            className="h-10 w-10 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-gray-900 dark:text-white">
          <ScrollLink
            to="HeroSection"
            smooth
            offset={-40}
            duration={900}
            className={navLinkClasses("HeroSection")}
            onClick={() => setActiveSection("HeroSection")}
          >
            {t("nav.home")}
          </ScrollLink>

          <ScrollLink
            to="about"
            smooth
            offset={-40}
            duration={900}
            className={navLinkClasses("about")}
            onClick={() => setActiveSection("about")}
          >
            {t("nav.about")}
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth
            offset={-40}
            duration={900}
            className={navLinkClasses("contact")}
            onClick={() => setActiveSection("contact")}
          >
            {t("nav.contact")}
          </ScrollLink>

          <Link
            to="/patient/dashboard"
            className={navLinkClasses("dashboard")}
            onClick={() => setActiveSection("dashboard")}
          >
            {t("nav.dashboard")}
          </Link>
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex gap-1 border px-2 rounded-full text-sm">
            <button onClick={() => switchLanguage("en")}>EN</button>
            <span>|</span>
            <button onClick={() => switchLanguage("hi")}>हिंदी</button>
          </div>
          <Link
            to="/login"
            className="text-indigo-600 dark:text-white bg-indigo-100 dark:bg-indigo-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
          >
            {t("nav.signup")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <AiOutlineMenu size={24} />
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur flex flex-col items-center justify-center space-y-6 text-gray-900 dark:text-white text-lg z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-6 text-gray-700 dark:text-white"
          >
            <AiOutlineClose size={28} />
          </button>

          <ScrollLink
            to="HeroSection"
            smooth
            offset={-40}
            duration={900}
            className="cursor-pointer hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav.home")}
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth
            offset={-40}
            duration={900}
            className="cursor-pointer hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav.about")}
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth
            offset={-40}
            duration={900}
            className="cursor-pointer hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav.contact")}
          </ScrollLink>
          <Link
            to="/patient/dashboard"
            className="hover:text-indigo-600"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("nav.dashboard")}
          </Link>
          <div className="flex space-x-4 mt-4">
            <Link
              to="/login"
              className="text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
            >
              {t("nav.signup")}
            </Link>
          </div>
          {/* Language Switcher */}
          <div className="flex gap-4 mt-6">
            <button onClick={() => switchLanguage("en")}>EN</button>
            <button onClick={() => switchLanguage("hi")}>हिंदी</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
