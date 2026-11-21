// src/views/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiCheckCircle,
  FiAward,
  FiBookOpen,
  FiUserCheck,
  FiShield,
  FiHeart,
  FiCalendar,
} from "react-icons/fi";
import { FaUserMd, FaLeaf, FaHandsHelping, FaBalanceScale } from "react-icons/fa";

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language?.startsWith("hi");

  const classicalPillars = [
    {
      icon: <FaLeaf className="text-emerald-500" />,
      title: isHi ? "100% प्राकृतिक एवं स्टेरॉयड मुक्त" : "100% Non-Toxic & Steroid Free",
      desc: isHi
        ? "कोमल प्राकृतिक सूक्ष्म-डायल्यूशन जो बिना किसी केमिकल निर्भरता या साइड-इफेक्ट्स के शरीर की स्वयं-हीलिंग शक्ति को जगाती हैं।"
        : "Gentle natural micro-dilutions that trigger the body's self-healing vital force without liver strain, chemical dependency, or steroid rebound.",
    },
    {
      icon: <FaBalanceScale className="text-indigo-500" />,
      title: isHi ? "व्यक्तिगत संवैधानिक मिलान" : "Constitutional & Thermal Matching",
      desc: isHi
        ? "उपचार आपकी शारीरिक प्रकृति (ठंड/गर्मी संवेदनशीलता), स्वभाव और पारिवारिक इतिहास के अनुसार अनुकूलित किया जाता है।"
        : "Treatment is personalized to your unique thermal affinity (hot/chilly), psychological temperament, food cravings, and family miasmatic history.",
    },
    {
      icon: <FaHandsHelping className="text-purple-500" />,
      title: isHi ? "रोग का जड़ से उन्मूलन" : "Root-Cause Eradication",
      desc: isHi
        ? "हम सिर्फ मलहम से त्वचा के चकत्ते नहीं दबाते, बल्कि अंदरूनी संतुलन को ठीक करके बार-बार बीमारी लौटने से रोकते हैं।"
        : "We don't simply mask skin eruptions with creams or quiet stomach burning with antacids. We resolve the internal disharmony to prevent relapse.",
    },
    {
      icon: <FiShield className="text-amber-500" />,
      title: isHi ? "सभी पीढ़ियों के लिए सुरक्षित" : "Safe for All Generations",
      desc: isHi
        ? "मीठी चीनी की गोलियां जो 2 साल के बच्चों से लेकर गर्भवती महिलाओं और बुजुर्गों तक सभी के लिए पूरी तरह सुरक्षित हैं।"
        : "Sweet sugar globules loved by 2-year-old toddlers, safe for pregnant mothers, and completely gentle on geriatric elderly patients.",
    },
  ];
  return (
    <section
      id="about"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Grid: Doctor Credentials & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Doctor Portrait Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-2 border-indigo-100 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-800">
              <img
                src="/doctor-rashi.jpg"
                alt="Dr. Rashi Shrivastava"
                className="w-full aspect-[4/5] object-cover object-top"
              />
              
              {/* Doctor Stats Strip */}
              <div className="p-6 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-gray-950 dark:text-white text-base">
                      Dr. Rashi Shrivastava
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      BHMS • Classical Homoeopath
                    </p>
                  </div>
                  <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <FiAward size={20} />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/80">
                    <span className="text-gray-400 block text-[10px] uppercase">{isHi ? "विशेषज्ञता" : "Specialty"}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{isHi ? "गंभीर एवं त्वचा रोग" : "Chronic & Skin"}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/80">
                    <span className="text-gray-400 block text-[10px] uppercase">{isHi ? "उपचार पद्धति" : "Practice"}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{isHi ? "क्लासिकल मियाज़्म" : "Classical Miasm"}</span>
                  </div>
                </div>

                <Link
                  to="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md"
                >
                  <FiCalendar /> {isHi ? "1-on-1 परामर्श बुक करें" : "Book 1-on-1 Session"}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Biography & Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <FaUserMd /> {isHi ? "प्रमाणित डॉक्टर प्रोफ़ाइल" : "Certified Doctor's Profile"}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {isHi ? "स्वास्थ्य को पुनर्स्थापित करने के लिए समर्पित, " : "Dedicated to Restoring Health, "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {isHi ? "केवल लक्षणों को दबाने के लिए नहीं।" : "Not Just Masking Symptoms."}
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {isHi
                ? "डॉ. राशी श्रीवास्तव ने बीएचएमएस (बैचलर ऑफ होम्योपैथिक मेडिसिन एंड सर्जरी) से स्नातक किया है। क्लासिकल रिपर्टरी और ऑर्गनन ऑफ मेडिसिन के गहन प्रशिक्षण के साथ, वे प्रत्येक मरीज़ के संपूर्ण शारीरिक व मानसिक मूल्यांकन पर ध्यान केंद्रित करती हैं।"
                : "Dr. Rashi Shrivastava graduated with a Bachelor of Homeopathic Medicine and Surgery (BHMS). With rigorous training in classical repertorization and organon of medicine, she focuses on deep constitutional case evaluations."}
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {isHi
                ? "उनके क्लिनिक ने मध्य प्रदेश और आसपास के क्षेत्रों में 500+ से अधिक मरीज़ों को डिजिटल टेली-कंसल्टेशन और क्लिनिक विज़िट्स के माध्यम से स्वस्थ किया है। हर नुस्खा प्रामाणिक जर्मन व भारतीय उच्च-पोटेंसी दवाओं से व्यक्तिगत रूप से तैयार किया जाता है।"
                : "Her clinic has successfully consulted over 500+ patient visits across Madhya Pradesh and surrounding regions via seamless high-definition tele-consultations and clinic visits. Every prescription is individually prepared with high-grade German and authentic Indian pharmacopeial dilutions."}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(isHi
                ? [
                    "प्रमाणित बीएचएमएस मेडिकल प्रैक्टिशनर",
                    "गहन संवैधानिक केस रिपर्टराइजेशन",
                    "शुद्ध उच्च-पोटेंसी होम्योपैथिक दवाएं",
                    "कूरियर ट्रैकिंग के साथ होम डिलीवरी",
                  ]
                : [
                    "Certified BHMS Medical Practitioner",
                    "Deep Constitutional Case Repertorization",
                    "Pure High-Potency Homoeopathic Dilutions",
                    "Doorstep Dispensary Dispatch with Courier Tracking",
                  ]
              ).map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <FiCheckCircle className="text-emerald-500 shrink-0 text-base" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom 4 Pillars Section */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {isHi ? "क्लासिकल होम्योपैथी ही क्यों?" : "Why Classical Homeopathy?"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {isHi
                ? "वे 4 मूल सिद्धांत जो होम्योपैथी को स्थायी स्वास्थ्य के लिए सबसे सुरक्षित और प्रभावी विकल्प बनाते हैं।"
                : "Understanding the 4 foundational principles that make homeopathy the safest choice for long-term health."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classicalPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 space-y-3"
              >
                <div className="p-3 w-fit rounded-2xl bg-gray-50 dark:bg-slate-900 text-2xl shadow-inner">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
