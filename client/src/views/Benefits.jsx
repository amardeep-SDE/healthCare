import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiSmile,
  FiCheckCircle,
  FiShield,
  FiDollarSign,
  FiHeart,
  FiThumbsUp,
} from "react-icons/fi";

const benefitItems = [
  { icon: <FiSmile />, key: "personal", hueA: 20, hueB: 60 },
  { icon: <FiShield />, key: "safe", hueA: 120, hueB: 160 },
  { icon: <FiCheckCircle />, key: "holistic", hueA: 200, hueB: 240 },
  { icon: <FiDollarSign />, key: "affordable", hueA: 300, hueB: 340 },
  { icon: <FiHeart />, key: "compassion", hueA: 340, hueB: 20 },
  { icon: <FiThumbsUp />, key: "trusted", hueA: 60, hueB: 100 },
];

const cardVariants = {
  offscreen: {
    y: 60,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.7,
    },
  },
};

const Benefits = () => {
  const { t } = useTranslation();

  return (
    <section
      id="benefits"
      className="bg-gradient-to-br from-[#f5f7fa] via-[#e0f7fa] to-[#f1f8e9] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-cyan-400 dark:to-blue-500 mb-16"
        >
          {t("benefits.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefitItems.map((item, index) => {
            const background = `linear-gradient(320deg, hsl(${item.hueA}, 100%, 94%), hsl(${item.hueB}, 100%, 88%))`;

            return (
              <motion.div
                key={index}
                className="relative rounded-3xl p-8 border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-md bg-white/50 dark:bg-slate-800/30 transition-all hover:-translate-y-2 hover:shadow-2xl group overflow-hidden"
                style={{ background }}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                {/* Glow border */}
                <div className="absolute inset-0 z-0 rounded-3xl border border-transparent group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-700"></div>

                {/* Icon */}
                <div className="relative z-10 text-5xl text-indigo-600 dark:text-indigo-300 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t(`benefits.${item.key}.title`)}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {t(`benefits.${item.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
