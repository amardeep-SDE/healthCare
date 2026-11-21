// src/views/FAQs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiPlus, FiHelpCircle } from "react-icons/fi";

const getClinicalFAQs = (isHi) => [
  {
    q: isHi ? "क्या होम्योपैथी से परिणाम दिखने में बहुत लंबा समय लगता है?" : "Does Homeopathy take very long to show results?",
    a: isHi
      ? "यह एक बहुत बड़ा भ्रम है! तीव्र (एक्यूट) समस्याओं जैसे एसिडिटी, सिरदर्द, मौसमी छींकें या अचानक बुखार में सही पोटेंसी लेने के कुछ ही मिनटों से घंटों में आराम मिलने लगता है। पुराने जिद्दी रोगों (जैसे 4 साल पुराना एक्जिमा या PCOD) में 2 से 4 हफ्तों के भीतर जड़ से सुधार शुरू हो जाता है, बिना किसी स्टेरॉयड के दुष्प्रभाव के।"
      : "This is a widespread myth! Acute ailments such as acidity, headaches, allergic sneezing, or sudden fevers respond within minutes to hours of taking the correct micro-potency. For deep-seated chronic conditions like 4-year-old atopic eczema or PCOD, gradual structural healing begins within 2 to 4 weeks without any steroid rebound.",
  },
  {
    q: isHi ? "क्या मैं अपनी चालू बीपी, थायरॉइड या शुगर की दवाओं के साथ होम्योपैथी ले सकता हूँ?" : "Can I take Homeopathy alongside my ongoing BP, Thyroid, or Diabetic medications?",
    a: isHi
      ? "हाँ, बिल्कुल! होम्योपैथिक दवाएं शरीर की नर्वस और वाइटल एनर्जी पर काम करती हैं और एलोपैथिक दवाओं के साथ कोई प्रतिकूल केमिकल रिएक्शन नहीं करतीं। हम केवल एलोपैथिक दवा और होम्योपैथिक खुराक के बीच 45 मिनट का अंतर रखने की सलाह देते हैं। जैसे-जैसे स्वास्थ्य सुधरता है, आपके प्राथमिक चिकित्सक रासायनिक दवाओं की खुराक सुरक्षित रूप से कम कर सकते हैं।"
      : "Yes, absolutely! Homeopathic remedies act on the neurological and vital energy plane and do not chemically interfere with conventional prescription drugs. We advise a 45-minute gap between your allopathic tablet and the homeopathic globule. As your constitutional health improves, your primary doctor can safely reduce chemical dosages.",
  },
  {
    q: isHi ? "क्या प्याज, लहसुन या कॉफी से परहेज करने जैसे सख्त खान-पान के नियम होते हैं?" : "Are there strict dietary restrictions like avoiding onion, garlic, or coffee?",
    a: isHi
      ? "डॉ. राशी के आधुनिक वैज्ञानिक दृष्टिकोण में हम केवल इतना कहते हैं कि दवा लेने से 20-30 मिनट पहले और बाद में मुंह साफ रखें और तेज गंध वाली चीजें (कच्चा लहसुन, खट्टा दही, तेज कॉफी) न लें। आपको किसी अस्वाभाविक या कठिन डाइटिंग की बिल्कुल आवश्यकता नहीं है।"
      : "In Dr. Rashi's modern classical approach, we only ask that you keep your mouth clean and avoid strong pungent substances (raw garlic, sour curd, or strong coffee) for 20–30 minutes before and after taking your dose. You do not need to starve or follow unrealistic diet plans.",
  },
  {
    q: isHi ? "बाहर के मरीज़ों के लिए ऑनलाइन वीडियो परामर्श और दवा डिलीवरी कैसे काम करती है?" : "How does the Online Video Consultation & Medicine Delivery work for outstation patients?",
    a: isHi
      ? "इंदौर/भोपाल से बाहर के मरीज़ ऑनलाइन वीडियो कंसल्टेशन बुक करते हैं। आप हमारे एन्क्रिप्टेड इन-ऐप वीडियो रूम या गूगल मीट के माध्यम से डॉ. राशी से सीधे जुड़ते हैं। केस समझने के बाद, आपकी व्यक्तिगत दवाएं ब्लू डार्ट एक्सप्रेस कूरियर द्वारा लाइव एसएमएस ट्रैकिंग के साथ सीधे आपके घर भेजी जाती हैं।"
      : "Patients outside Indore/Bhopal book an Online Video Consultation. You connect face-to-face with Dr. Rashi via our encrypted in-app tele-consultation room or Google Meet. Following your case evaluation, your custom-prepared remedies and care kit are dispatched via BlueDart express courier directly to your doorstep with live SMS tracking.",
  },
  {
    q: isHi ? "क्या होम्योपैथिक दवाएं छोटे बच्चों और गर्भवती महिलाओं के लिए पूरी तरह सुरक्षित हैं?" : "Are Homeopathic medicines completely safe for young children & pregnant women?",
    a: isHi
      ? "100% सुरक्षित! होम्योपैथिक दवाएं प्राकृतिक सूक्ष्म-पोटेंसी में तैयार की जाती हैं, जिनमें कोई हानिकारक केमिकल या स्टेरॉयड नहीं होता। छोटे बच्चे मीठी गोलियां खुशी-खुशी खाते हैं, और गर्भवती माताएं मॉर्निंग सिकनेस और रोग प्रतिरोधक क्षमता के लिए इसे सुरक्षित रूप से ले सकती हैं।"
      : "100% yes! Homeopathic preparations are formulated using micro-dilutions, meaning they contain zero aggressive chemicals, no steroids, and have zero side-effects. Toddlers gladly take the sweet lactose globules, and expectant mothers can safely take remedies for morning sickness and immunity.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const isHi = i18n.language?.startsWith("hi");
  const clinicalFAQs = getClinicalFAQs(isHi);

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
            <FiHelpCircle /> {isHi ? "मरीज़ों के प्रश्न एवं समाधान" : "Patient Clarity & Answers"}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isHi ? "अक्सर पूछे जाने वाले " : "Frequently Asked "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isHi ? "प्रश्न" : "Questions"}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {isHi
              ? "क्लासिकल होम्योपैथी, उपचार की अवधि और परामर्श प्रक्रिया से जुड़े पारदर्शी उत्तर।"
              : "Transparent answers regarding classical homeopathy, treatment timelines, and consultation procedures."}
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
