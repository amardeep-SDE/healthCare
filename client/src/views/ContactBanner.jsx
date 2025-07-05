import React from "react";
import {
  FiMail,
  FiPhoneCall,
  FiUser,
  FiMessageCircle,
  FiMapPin,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24 relative"
    >
      <div className="absolute inset-0 bg-[url('/contact-bg.svg')] bg-contain bg-no-repeat bg-right opacity-10 dark:opacity-5 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-10"
        >
          {t("contact.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className="flex flex-col justify-center text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-5"
          >
            <p>{t("contact.description")}</p>

            <div className="flex items-center space-x-3 group">
              <FiPhoneCall className="text-indigo-600 text-xl transition-transform duration-300 group-hover:-translate-x-1" />
              <a
                href={`tel:${t("contact.phone")}`}
                className="text-gray-800 dark:text-gray-300 group-hover:text-indigo-600 transition-all"
              >
                {t("contact.phone")}
              </a>
            </div>

            <div className="flex items-center space-x-3 group">
              <FiMail className="text-indigo-600 text-xl transition-transform duration-300 group-hover:scale-125" />
              <a
                href={`mailto:${t("contact.email")}`}
                className="text-gray-800 dark:text-gray-300 group-hover:text-indigo-600 transition-all"
              >
                {t("contact.email")}
              </a>
            </div>

            {/* Address Section */}
            <div className="flex items-start space-x-3 mt-4">
              <FiMapPin className="text-indigo-600 text-xl mt-1" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 dark:text-white">{t("clinicAddress.addressTitle")}</p>
                <p>{t("clinicAddress.addressLine1")}</p>
                <p>{t("clinicAddress.addressLine2")}</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-md mt-6">
              <iframe
                title="clinic-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3478260599365!2d75.86769307508866!3d22.754998179351095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd065d3a09d3%3A0xf7d9a2c0c51a6a35!2sNew%20Palasia%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1720079595559!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div className="relative group">
              <FiUser className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <input
                type="text"
                placeholder={t("contact.form.name")}
                className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
              />
            </div>

            <div className="relative group">
              <FiMail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <input
                type="email"
                placeholder={t("contact.form.email")}
                className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
              />
            </div>

            <div className="relative group">
              <FiMessageCircle className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-indigo-600 transition" />
              <textarea
                rows="4"
                placeholder={t("contact.form.message")}
                className="pl-10 w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
              />
            </div>

            <button
              type="submit"
              className="relative group overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-all w-full font-semibold"
            >
              <span className="relative z-10">{t("contact.form.submit")}</span>
              <span className="absolute left-[-100%] top-0 h-full w-32 bg-white opacity-10 rotate-12 group-hover:animate-shine"></span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
