import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] dark:from-gray-900 dark:to-slate-800 text-gray-700 dark:text-gray-300 pt-12 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 w-full overflow-hidden">
      <div className="flex flex-wrap justify-between gap-10 md:gap-6">
        {/* Logo + About */}
        <div className="max-w-full sm:max-w-80">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
            alt="logo"
            className="mb-4 h-9"
          />
          <p className="text-sm">{t("footer.about")}</p>
            <div className="flex items-center gap-3 mt-4 pt-1">
              <Link
                to="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#d62976] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FaInstagram className="text-base" />
              </Link>
              <Link
                to="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#00acee] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FaTwitter className="text-base" />
              </Link>
              <Link
                to="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#0072b1] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FaLinkedinIn className="text-base" />
              </Link>
              <Link
                to="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#128c7e] text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FaFacebookF className="text-base" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg text-gray-900 dark:text-white font-semibold">
              {t("footer.company")}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.careers")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.press")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.partners")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-lg text-gray-900 dark:text-white font-semibold">
              {t("footer.support")}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link to="/contact" className="footer-link">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.help")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.safety")}
                </Link>
              </li>
              <li>
                <Link to="#" className="footer-link">
                  {t("footer.cancel")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-80">
            <p className="text-lg text-gray-900 dark:text-white font-semibold">
              {t("footer.newsletter.title")}
            </p>
            <p className="mt-3 text-sm">{t("footer.newsletter.desc")}</p>
            <div className="flex items-center mt-4 group">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                placeholder={t("footer.newsletter.placeholder")}
              />
              <button className="h-full px-3 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-r-md">
                <FaArrowRight className="text-white text-lg transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mt-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm">
          <p>
            © {new Date().getFullYear()} Dr. Rashi. {t("footer.copyright")}
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="#" className="footer-link">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                {t("footer.sitemap")}
              </Link>
            </li>
          </ul>
        </div>
    </footer>
  );
};

export default Footer;
