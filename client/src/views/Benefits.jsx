// src/views/Benefits.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiCalendar,
  FiFileText,
  FiTruck,
  FiArrowRight,
  FiStar,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";
import { FaUserMd, FaQuoteLeft } from "react-icons/fa";

const getTreatmentSteps = (isHi) => [
  {
    step: "01",
    title: isHi ? "अपॉइंटमेंट बुकिंग एवं डिजिटल रिपोर्ट" : "Book & Digital Intake",
    desc: isHi
      ? "ऑनलाइन वीडियो स्लॉट या क्लिनिक विज़िट चुनें। अपने मौजूदा ब्लड टेस्ट, पुरानी पर्चियां या त्वचा की तस्वीरें हमारे एन्क्रिप्टेड पोर्टल पर अपलोड करें।"
      : "Choose an online video slot or physical visit. Upload your existing blood tests, prescription slips, or skin photos via our encrypted health locker.",
    icon: <FiCalendar className="text-indigo-600 dark:text-indigo-400" />,
  },
  {
    step: "02",
    title: isHi ? "30 मिनट का गहन केस मूल्यांकन" : "30-Min In-Depth Diagnosis",
    desc: isHi
      ? "डॉ. राशी आपके शारीरिक लक्षण, थर्मल संवेदनशीलता (ठंड/गर्मी), स्वभाव और तनाव का विश्लेषण करके सटीक सिमिलिमम का चुनाव करती हैं।"
      : "Dr. Rashi analyzes your constitutional traits, thermal preference (chilly/hot), food cravings, and psychological stressors to find the simillimum.",
    icon: <FaUserMd className="text-purple-600 dark:text-purple-400" />,
  },
  {
    step: "03",
    title: isHi ? "दवा डिस्पैच एवं लाइव ट्रैकिंग" : "Dispensary Dispatch & Live Tracking",
    desc: isHi
      ? "प्रामाणिक होम्योपैथिक दवाएं ब्लू डार्ट कूरियर ट्रैकिंग के साथ सीधे आपके पते पर भेजी जाती हैं। पेशेंट पोर्टल में अपनी रिकवरी दर्ज करें।"
      : "Original homeopathic medicated globules shipped to your address with BlueDart tracking. Log your daily symptom recovery (1-10) in the Patient Portal.",
    icon: <FiTruck className="text-emerald-600 dark:text-emerald-400" />,
  },
];

const getPatientTransformations = (isHi) => [
  {
    name: isHi ? "अनन्या शर्मा" : "Ananya Sharma",
    age: 26,
    location: isHi ? "भोपाल, मध्य प्रदेश" : "Bhopal, MP",
    condition: isHi ? "एटोपिक एक्जिमा एवं संवेदनशील त्वचा" : "Atopic Eczema & Sensitive Skin",
    improvement: isHi ? "4 सप्ताह में 70% राहत" : "70% in 4 Weeks",
    duration: isHi ? "सक्रिय उपचार" : "Active Care",
    remedy: "Graphites 200CH + Calendula",
    quote: isHi
      ? "मुझे 2 साल से कोहनी और गर्दन पर तेज लाल चकत्ते और खुजली थी। स्टेरॉयड क्रीम से सिर्फ तात्कालिक असर होता था। डॉ. राशी की दवाओं के 3 सप्ताह में मेरी त्वचा पूरी तरह शांत हो गई और नींद वापस आ गई!"
      : "I suffered from severe dry redness and nighttime itching on my elbows for 2 years. Allopathic steroid creams kept causing rebound flares. Within 3 weeks of Dr. Rashi's constitutional doses, my skin softened completely and sleep is back!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: isHi ? "राजेश मेहरा" : "Rajesh Mehra",
    age: 42,
    location: isHi ? "इंदौर, मध्य प्रदेश" : "Indore, MP",
    condition: isHi ? "पुरानी एसिडिटी और सीने में जलन (GERD)" : "Chronic Acidity & GERD",
    improvement: isHi ? "3 सप्ताह में 85% सुधार" : "85% in 3 Weeks",
    duration: isHi ? "सफलतापूर्वक पूर्ण" : "Completed",
    remedy: "Nux Vomica 30C + Carbo Veg",
    quote: isHi
      ? "दोपहर के खाने के बाद जलन से बचने के लिए मैं रोज़ाना गैस का कैप्सूल खाता था। डॉ. राशी की होम्योपैथिक बूंदों ने बिना किसी केमिकल दवा के मुझे तुरंत और स्थायी आराम दिया।"
      : "I was popping daily antacid capsules just to survive post-lunch burning. Dr. Rashi identified my sedentary schedule and dietary sensitivity. The homeopathic drops brought immediate soothing without a single chemical pill.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: isHi ? "पूजा एवं आरव (6 वर्ष)" : "Pooja & Master Aarav (6 yrs)",
    age: 32,
    location: isHi ? "जबलपुर, मध्य प्रदेश" : "Jabalpur, MP",
    condition: isHi ? "बच्चों में बार-बार सर्दी व सांस फूलना" : "Recurrent Child Cold & Wheezing",
    improvement: isHi ? "इस मौसम में 90% बचाव" : "90% This Season",
    duration: isHi ? "सुरक्षात्मक देखभाल" : "Preventive Care",
    remedy: "Tuberculinum 200 + Calc Phos",
    quote: isHi
      ? "मौसम बदलते ही मेरे 6 वर्षीय बेटे को नेबुलाइज़र और एंटीबायोटिक की जरूरत पड़ती थी। डॉ. राशी की मीठी गोलियों ने आरव की छाती की प्रतिरोधक क्षमता इतनी बढ़ा दी कि इस सर्दी में उसने एक भी स्कूल मिस नहीं किया!"
      : "Every weather change used to mean nebulizer masks and antibiotic courses for my son. Dr. Rashi's sweet sugar pills boosted Aarav's natural chest resistance so well that he hasn't missed a single school day this winter!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
];

const Benefits = () => {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language?.startsWith("hi");
  const treatmentSteps = getTreatmentSteps(isHi);
  const patientTransformations = getPatientTransformations(isHi);

  return (
    <section
      id="benefits"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-indigo-50/20 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* 1. How It Works: 3-Step Journey */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {isHi ? "उपचार का रोडमैप" : "The Healing Roadmap"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {isHi ? "आपका परामर्श एवं " : "How Your Consultation & "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {isHi ? "रिकवरी प्रक्रिया" : "Recovery Works"}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {isHi
                ? "प्राचीन क्लासिकल होम्योपैथी की गहराई और आधुनिक डिजिटल तकनीक का एक पारदर्शी व विश्वसनीय संगम।"
                : "A transparent, supportive healthcare journey combining ancient homeopathic depth with modern digital ease."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative rounded-3xl bg-white dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-indigo-600/30 dark:text-indigo-400/30 font-mono">
                      {step.step}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-2xl shadow-inner">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/50 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{isHi ? `चरण ${idx + 1} / 3` : `Step ${idx + 1} of 3`}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Real Patient Case Transformations */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {isHi ? "सत्यापित केस रिकॉर्ड्स" : "Verified Case Logs"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {isHi ? "मरीज़ों के वास्तविक अनुभव एवं " : "Real Patient Stories & "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {isHi ? "सत्यापित रिकवरी" : "Documented Recovery"}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {isHi
                ? "जानिए कैसे संवैधानिक होम्योपैथी ने बिना किसी दुष्प्रभाव के हज़ारों जीवन में स्थायी स्वास्थ्य लाया।"
                : "Explore how constitutional homeopathy transformed lives with zero toxicity and lasting wellness."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {patientTransformations.map((patient, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-3xl bg-white dark:bg-slate-800/70 border border-gray-200/80 dark:border-slate-700/80 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300"
              >
                <div>
                  {/* Top Quote Icon & Recovery Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-300 dark:text-indigo-700 text-2xl">
                      <FaQuoteLeft />
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                      <FiTrendingUp /> {patient.improvement}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed italic mb-6">
                    "{patient.quote}"
                  </p>

                  {/* Remedy Used Tag */}
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200/80 dark:border-slate-700 text-[11px] text-gray-600 dark:text-gray-300 mb-6">
                    <span className="font-bold text-gray-900 dark:text-white block">
                      {isHi ? "निर्धारित मुख्य औषधि:" : "Prescribed Simillimum:"}
                    </span>
                    <span>{patient.remedy}</span>
                  </div>
                </div>

                {/* Patient Profile Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {patient.name} ({patient.age} {isHi ? "वर्ष" : "yrs"})
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {patient.location} • <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{patient.condition}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition hover:scale-105"
            >
              {isHi ? "अपनी स्वास्थ्य यात्रा आज ही शुरू करें (₹500)" : "Start Your Own Recovery Journey (₹500)"} <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Benefits;
