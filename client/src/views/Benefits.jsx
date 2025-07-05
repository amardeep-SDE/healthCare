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
  {
    icon: <FiSmile />,
    key: "personal",
    hueA: 20,
    hueB: 60,
  },
  {
    icon: <FiShield />,
    key: "safe",
    hueA: 120,
    hueB: 160,
  },
  {
    icon: <FiCheckCircle />,
    key: "holistic",
    hueA: 200,
    hueB: 240,
  },
  {
    icon: <FiDollarSign />,
    key: "affordable",
    hueA: 300,
    hueB: 340,
  },
  {
    icon: <FiHeart />,
    key: "compassion",
    hueA: 340,
    hueB: 20,
  },
  {
    icon: <FiThumbsUp />,
    key: "trusted",
    hueA: 60,
    hueB: 100,
  },
];

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -4,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
    },
  },
};

const Benefits = () => {
  const { t } = useTranslation();

  return (
    <section
      id="benefits"
      className="bg-gradient-to-br from-[#f5f7fa] via-[#e8f5e9] to-[#e3f2fd] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-16"
        >
          {t("benefits.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitItems.map((item, index) => {
            const background = `linear-gradient(306deg, hsl(${item.hueA}, 100%, 90%), hsl(${item.hueB}, 100%, 85%))`;

            return (
              <motion.div
                key={index}
                className="rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-2 hover:scale-[1.02]"
                style={{ background }}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <div className="text-4xl text-indigo-700 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t(`benefits.${item.key}.title`)}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
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
