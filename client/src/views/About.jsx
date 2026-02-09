import React from "react";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const icons = [
    <FiUserCheck size={22} />,
    <FiHeart size={22} />,
    <FiHeart size={22} />,
    <FiUserCheck size={22} />,
  ];

  // Medical related images
  const images = [
    "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800", // Doctor consultation
    "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800", // Patient care
    "https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=800", // Medical team
    "https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=800", // Clinic interior
  ];

  const cards = t("about.cards", { returnObjects: true });

  return (
    <section
      id="about"
      className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-24 px-6 sm:px-10 md:px-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl max-w-3xl mx-auto mb-16 shadow-lg"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-800/70 
              border border-gray-200 dark:border-slate-700 
              shadow-md hover:shadow-2xl 
              transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={images[idx]}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Icon */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 
                p-4 rounded-full border border-indigo-300 dark:border-indigo-600 
                shadow-lg group-hover:scale-110 transition">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {icons[idx]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 pb-6 px-6 text-center space-y-3">
                <h3 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white group-hover:text-indigo-600 transition">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
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
