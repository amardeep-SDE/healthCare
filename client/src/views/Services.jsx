import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiHeart, FiZap, FiUserPlus, FiSmile } from "react-icons/fi";

const serviceItems = [
  { icon: <FiHeart />, key: "chronic" },
  { icon: <FiZap />, key: "acute" },
  { icon: <FiUserPlus />, key: "women" },
  { icon: <FiSmile />, key: "child" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const Services = () => {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-10 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed"
          >
            {t("services.subtitle")}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceItems.map((item, index) => (
              <motion.div
                key={item.key}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group p-6 rounded-2xl shadow-lg border border-transparent bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-indigo-500/50"
              >
                {/* Glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 pointer-events-none" />

                {/* Icon + Title */}
                <div className="relative z-10 flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-3 text-indigo-600 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/70 rounded-xl text-3xl shadow-md"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t(`services.${item.key}.title`)}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(`services.${item.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor illustration"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
