import React from "react";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const icons = [<FiUserCheck size={24} />, <FiHeart size={24} />, <FiHeart size={24} />, <FiUserCheck size={24} />];

  const images = [
    "https://images.pexels.com/photos/8376170/pexels-photo-8376170.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/8460151/pexels-photo-8460151.jpeg?auto=compress&cs=tinysrgb&w=640",
    "https://images.pexels.com/photos/8376192/pexels-photo-8376192.jpeg?auto=compress&cs=tinysrgb&w=640",
  ];

  const cards = t("about.cards", { returnObjects: true });

  return (
    <section
      id="about"
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 pt-40 px-6 sm:px-10 md:px-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl  dark:border-gray-800 max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("about.name")}{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.title")}
            </span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            {t("about.intro", { name: t("about.name") })}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition duration-500"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={images[idx]}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-900 p-3 rounded-full border border-indigo-300 dark:border-indigo-600 shadow-md z-10">
                  <span className="text-indigo-600 dark:text-indigo-400">{icons[idx]}</span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-10 pb-6 px-5 text-center space-y-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 transition">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
