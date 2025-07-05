import React from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import AnimatedWrapper from "../components/AnimatedWrapper";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();

  const images = [
    "https://images.pexels.com/photos/8376170/pexels-photo-8376170.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/8460151/pexels-photo-8460151.jpeg?auto=compress&cs=tinysrgb&w=640",
  ];

  return (
    <section
      id="HeroSection"
      className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-300"
    >
      <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        <AnimatedWrapper className="flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center md:items-start">
            {/* Top Label */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-16 mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              <motion.span
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, x: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {t("hero.label")}
              </motion.span>

              <motion.span
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600 text-white"
              >
                <FiArrowRight size={14} />
              </motion.span>
            </motion.button>

            {/* Heading */}
            <h1 className="text-gray-900 dark:text-white font-bold text-3xl sm:text-4xl md:text-6xl max-w-xl leading-tight">
              {t("hero.headingPrefix")}{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                <Typewriter
                  words={t("hero.typewriter", { returnObjects: true })}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md text-sm sm:text-base leading-relaxed">
              {t("hero.description")}
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
              <motion.Link
                to="/appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-6 pr-3 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2"
              >
                <motion.span
                  className="font-medium"
                  whileHover={{ letterSpacing: "1px" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {t("hero.book")}
                </motion.span>

                <motion.span
                  whileHover={{ x: 5, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center"
                >
                  <FiArrowUpRight size={18} />
                </motion.span>
              </motion.Link>

              <motion.Link
                to="/treatments"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900 transition flex items-center space-x-2"
              >
                <motion.span
                  whileHover={{ letterSpacing: "1px" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {t("hero.view")}
                </motion.span>

                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiArrowRight size={16} />
                </motion.span>
              </motion.Link>
            </div>
          </div>
        </AnimatedWrapper>

        {/* Animated Images */}
        <div className="mt-12 grid grid-cols-2 gap-6 pb-6">
          {images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Doctor ${i}`}
              className="w-36 h-44 rounded-lg object-cover shadow-lg"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
