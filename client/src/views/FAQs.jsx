import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiPlus, FiMinus } from "react-icons/fi";

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
      className="bg-gradient-to-b from-white via-blue-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-6 sm:px-10 md:px-24"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          {t("faq.title")}
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <span>{t(`faq.${faq.key}.question`)}</span>
                {activeIndex === index ? (
                  <FiMinus className="text-xl" />
                ) : (
                  <FiPlus className="text-xl" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-600 dark:text-gray-300 text-base"
                  >
                    {t(`faq.${faq.key}.answer`)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
