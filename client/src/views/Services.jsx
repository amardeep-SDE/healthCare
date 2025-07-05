import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiHeart, FiZap, FiUserPlus, FiSmile } from "react-icons/fi";

const serviceItems = [
  {
    icon: <FiHeart />,
    key: "chronic",
  },
  {
    icon: <FiZap />,
    key: "acute",
  },
  {
    icon: <FiUserPlus />,
    key: "women",
  },
  {
    icon: <FiSmile />,
    key: "child",
  },
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
    className="bg-gradient-to-br from-[#ede7f6] via-[#e3f2fd] to-[#e8eaf6] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24"

    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Text */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-6"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 mb-10 text-lg"
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
                className="relative group p-6 bg-white dark:bg-gray-800 border-2 border-transparent rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.03] hover:border-indigo-400 hover:shadow-2xl"
              >
                {/* Animated Gradient Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-0 group-hover:opacity-40 blur-lg transition-all duration-700 pointer-events-none" />

                {/* Icon + Title */}
                <div className="relative z-10 flex items-center gap-3 text-indigo-600 text-3xl mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full transition-all duration-300 group-hover:animate-bounce">
                    {item.icon}
                  </div>
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
          className="w-full"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor illustration"
            className="w-full max-w-md mx-auto rounded-xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
