import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

const faqs = [
  { key: "q1" },
  { key: "q2" },
  { key: "q3" },
  { key: "q4" },
];

const FAQs = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="relative overflow-hidden py-20 px-4 sm:px-8 md:px-20 
                 bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_65%)]
                 dark:bg-[radial-gradient(circle_at_top,_#020617,_#020617_65%)]"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-indigo-400/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center 
                     text-gray-900 dark:text-white"
        >
          {t("faq.title")}
        </motion.h2>

        <p className="mt-3 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Clear answers to common questions about treatment, appointments, and care.
        </p>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={faq.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group rounded-3xl border backdrop-blur-xl transition-all
                  ${
                    isOpen
                      ? "bg-white/80 dark:bg-gray-900/80 border-indigo-300 dark:border-indigo-500 shadow-[0_20px_60px_rgba(79,70,229,0.15)]"
                      : "bg-white/60 dark:bg-gray-900/60 border-white/40 dark:border-gray-700 hover:shadow-lg"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-6 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {t(`faq.${faq.key}.question`)}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-center justify-center w-9 h-9 rounded-full 
                      ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      }`}
                  >
                    <FiPlus className="text-lg" />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="px-6 pb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      {t(`faq.${faq.key}.answer`)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
