// src/views/FAQs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiHelpCircle } from "react-icons/fi";

const clinicalFAQs = [
  {
    q: "Does Homeopathy take very long to show results?",
    a: "This is a widespread myth! Acute ailments such as acidity, headaches, allergic sneezing, or sudden fevers respond within minutes to hours of taking the correct micro-potency. For deep-seated chronic conditions like 4-year-old atopic eczema or PCOD, gradual structural healing begins within 2 to 4 weeks without any steroid rebound.",
  },
  {
    q: "Can I take Homeopathy alongside my ongoing BP, Thyroid, or Diabetic medications?",
    a: "Yes, absolutely! Homeopathic remedies act on the neurological and vital energy plane and do not chemically interfere with conventional prescription drugs. We advise a 45-minute gap between your allopathic tablet and the homeopathic globule. As your constitutional health improves, your primary doctor can safely reduce chemical dosages.",
  },
  {
    q: "Are there strict dietary restrictions like avoiding onion, garlic, or coffee?",
    a: "In Dr. Rashi's modern classical approach, we only ask that you keep your mouth clean and avoid strong pungent substances (raw garlic, sour curd, or strong coffee) for 20–30 minutes before and after taking your dose. You do not need to starve or follow unrealistic diet plans.",
  },
  {
    q: "How does the Online Video Consultation & Medicine Delivery work for outstation patients?",
    a: "Patients outside Indore/Bhopal book an Online Video Consultation. You connect face-to-face with Dr. Rashi via our encrypted in-app tele-consultation room or Google Meet. Following your case evaluation, your custom-prepared remedies and care kit are dispatched via BlueDart express courier directly to your doorstep with live SMS tracking.",
  },
  {
    q: "Are Homeopathic medicines completely safe for young children & pregnant women?",
    a: "100% yes! Homeopathic preparations are formulated using micro-dilutions, meaning they contain zero aggressive chemicals, no steroids, and have zero side-effects. Toddlers gladly take the sweet lactose globules, and expectant mothers can safely take remedies for morning sickness and immunity.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faqs"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50/70 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <FiHelpCircle /> Patient Clarity & Answers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Transparent answers regarding classical homeopathy, treatment timelines, and consultation procedures.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {clinicalFAQs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-slate-800 border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/5"
                    : "bg-white/70 dark:bg-slate-800/40 border-gray-200/80 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-gray-900 dark:text-white text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`p-2 rounded-xl text-xs shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-indigo-600 text-white rotate-45"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <FiPlus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700/60 pt-4"
                    >
                      {faq.a}
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
