// src/views/Services.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiArrowRight,
  FiCheck,
  FiShield,
  FiActivity,
  FiSmile,
  FiClock,
} from "react-icons/fi";
import {
  FaHeartbeat,
  FaFemale,
  FaBaby,
  FaBrain,
  FaLeaf,
  FaPills,
  FaSpa,
} from "react-icons/fa";
import { RiMedicineBottleLine } from "react-icons/ri";

const getClinicalTreatments = (isHi) => [
  {
    id: "skin",
    concernName: isHi ? "त्वचा एवं एक्जिमा" : "Skin & Atopic Eczema",
    title: isHi ? "पुराने त्वचा रोग, एक्जिमा और सोरायसिस" : "Chronic Skin, Eczema & Psoriasis",
    icon: <FaHeartbeat className="text-rose-500" />,
    badge: isHi ? "सर्वाधिक परामर्शित" : "Most Consulted",
    badgeColor: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    description: isHi
      ? "स्टेरॉयड के बिना सूखी खुजली, पित्ती (अर्टिकेरिया) और एलर्जिक डर्मेटाइटिस से स्थायी और प्राकृतिक राहत।"
      : "Permanent relief from dry itchy patches, lichenification, recurring urticaria, and contact dermatitis without steroid side-effects.",
    reliefTimeline: isHi ? "3 से 6 सप्ताह में औसत राहत" : "3 to 6 Weeks avg. relief",
    topRemedies: ["Graphites 200CH", "Sulphur 30C", "Calendula Q"],
    symptomsCovered: isHi ? ["रात में तेज खुजली", "लाल पपड़ीदार चकत्ते", "सूखी त्वचा"] : ["Nighttime Itching", "Red Flaky Patches", "Dry Flare-ups"],
  },
  {
    id: "hair",
    concernName: isHi ? "बाल झड़ना एवं स्कैल्प" : "Hair Fall & Scalp Health",
    title: isHi ? "बाल झड़ना, एलोपेसिया और डैंड्रफ" : "Hair Fall, Alopecia & Scalp Care",
    icon: <FaSpa className="text-amber-500" />,
    badge: isHi ? "उत्कृष्ट परिणाम" : "High Recovery",
    badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    description: isHi
      ? "तनाव या बीमारी के बाद बाल पतले होने, एलोपेसिया एरीटा और जिद्दी रूसी का प्राकृतिक उपचार।"
      : "Nutritive hair follicle rejuvenation tackling stress-induced alopecia areata, post-fever hair thinning, and recurrent stubborn dandruff.",
    reliefTimeline: isHi ? "4 से 8 सप्ताह में नए बाल" : "4 to 8 Weeks root regrowth",
    topRemedies: ["Wiesbaden 200CH", "Arnica & Jaborandi Q", "Bio-28"],
    symptomsCovered: isHi ? ["अत्यधिक बाल झड़ना", "बालों का पतला होना", "स्कैल्प में सूखापन"] : ["Excessive Hair Fall", "Thinning Crown", "Scalp Dryness"],
  },
  {
    id: "gastric",
    concernName: isHi ? "पाचन एवं एसिडिटी" : "Gastric & Digestive",
    title: isHi ? "एसिडिटी, जीईआरडी और पाचन समस्याएं" : "Acidity, GERD & Digestive Health",
    icon: <RiMedicineBottleLine className="text-indigo-500" />,
    badge: isHi ? "त्वरित राहत" : "Fast Acting",
    badgeColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    description: isHi
      ? "दैनिक एंटासिड पर निर्भरता, भोजन के बाद पेट फूलना, एसिड रिफ्लक्स और पुरानी कब्ज से कोमल मुक्ति।"
      : "Gentle digestive harmony to eliminate reliance on daily antacids, post-heavy-meal bloating, acid reflux, chronic constipation, and IBS.",
    reliefTimeline: isHi ? "7 से 14 दिनों में स्पष्ट आराम" : "7 to 14 Days noticeable ease",
    topRemedies: ["Nux Vomica 30C", "Carbo Veg 200CH", "Lycopodium"],
    symptomsCovered: isHi ? ["सीने में जलन / खट्टी डकार", "पेट फूलना व गैस", "कमजोर पाचन"] : ["Heartburn / Reflux", "Bloating & Gas", "Sluggish Digestion"],
  },
  {
    id: "women",
    concernName: isHi ? "PCOD एवं महिला स्वास्थ्य" : "PCOD & Hormonal Health",
    title: isHi ? "PCOD, PCOS एवं हार्मोनल असंतुलन" : "PCOD, PCOS & Hormonal Balance",
    icon: <FaFemale className="text-purple-500" />,
    badge: isHi ? "प्राकृतिक चक्र" : "Natural Cycle",
    badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    description: isHi
      ? "मासिक चक्र को स्वाभाविक रूप से नियमित करना, हार्मोनल मुंहासे (एक्ने) और वजन को संतुलित करना।"
      : "Constitutional ovarian stimulation restoring natural regular cycles, reversing hormonal cystic acne, and stabilizing weight.",
    reliefTimeline: isHi ? "2 से 3 चक्रों में सामान्यीकरण" : "2 to 3 Cycles normalization",
    topRemedies: ["Pulsatilla 200CH", "Sepia 30C", "Calcarea Carb"],
    symptomsCovered: isHi ? ["अनियमित मासिक चक्र", "हार्मोनल मुंहासे", "मूड स्विंग्स"] : ["Delayed Cycles", "Hormonal Jawline Acne", "Mood Swings"],
  },
  {
    id: "pediatric",
    concernName: isHi ? "शिशु एवं बाल स्वास्थ्य" : "Pediatric Immunity",
    title: isHi ? "बच्चों की इम्युनिटी एवं बार-बार एलर्जी" : "Child Immunity & Recurrent Allergies",
    icon: <FaBaby className="text-emerald-500" />,
    badge: isHi ? "मीठी गोलियां • 100% सुरक्षित" : "Sweet Pills • 100% Safe",
    badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    description: isHi
      ? "मीठी चीनी की गोलियां जो बच्चे खुशी से खाते हैं! मौसम बदलते ही सर्दी-जुकाम, टॉन्सिल और सांस फूलने से सुरक्षा।"
      : "Sweet sugar globules that children love! Builds deep natural immunity against recurrent seasonal flu, adenoids, tonsillitis, and wheezing.",
    reliefTimeline: isHi ? "मौसम भर प्राकृतिक सुरक्षा कवच" : "Continuous seasonal shielding",
    topRemedies: ["Tuberculinum 200", "Calc Phos 6X", "Aconite 30"],
    symptomsCovered: isHi ? ["मौसम बदलते ही बुखार", "बार-बार खांसी", "कम भूख लगना"] : ["Weather Change Fevers", "Frequent Cough", "Low Appetite"],
  },
  {
    id: "stress",
    concernName: isHi ? "तनाव, सिरदर्द एवं अनिद्रा" : "Stress & Sleep",
    title: isHi ? "माइग्रेन, नींद न आना एवं मानसिक तनाव" : "Migraine, Sleep & Stress Relief",
    icon: <FaBrain className="text-cyan-500" />,
    badge: isHi ? "नशे की लत रहित" : "Non-Sedative",
    badgeColor: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    description: isHi
      ? "गहरी आरामदायक नींद बहाल करना, एकतरफा तेज माइग्रेन और मानसिक थकान को बिना किसी केमिकल लत के दूर करना।"
      : "Restores restful deep REM sleep and relieves debilitating one-sided migraines and chronic mental fatigue without chemical addiction.",
    reliefTimeline: isHi ? "कुछ ही दिनों में शांति और आराम" : "Immediate calming within days",
    topRemedies: ["Passiflora Q", "Coffea Cruda 200CH", "Kali Phos 6X"],
    symptomsCovered: isHi ? ["तेज टीस वाला सिरदर्द", "टूटी-फूटी नींद", "कार्य का तनाव"] : ["Throbbing Headache", "Broken Sleep", "Work Burnout"],
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { t, i18n } = useTranslation();
  const isHi = i18n.language?.startsWith("hi");

  return (
    <section
      id="services"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Ornaments */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <FaLeaf /> {isHi ? "क्लिनिकल विशेषज्ञता एवं उपचार" : "Clinical Expertise & Specializations"}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {isHi ? "पुरानी व गंभीर बीमारियों के लिए " : "Comprehensive Care for "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isHi ? "संपूर्ण प्राकृतिक देखभाल" : "Chronic & Recurrent Health"}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? "डॉ. राशी श्रीवास्तव आपके संपूर्ण संवैधानिक केस (मानसिक प्रकृति, थर्मल संवेदनशीलता और शारीरिक लक्षणों) का अध्ययन करके सटीक प्राकृतिक दवाएं निर्धारित करती हैं।"
              : "Dr. Rashi Shrivastava evaluates your complete constitutional case—mental disposition, thermal affinity, and physical miasms—to prescribe targeted natural remedies."}
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getClinicalTreatments(isHi).map((treatment, idx) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl bg-gray-50/80 dark:bg-slate-800/50 border border-gray-200/80 dark:border-slate-700/80 p-7 flex flex-col justify-between hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300"
            >
              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 shadow-md text-2xl group-hover:scale-110 transition-transform">
                    {treatment.icon}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${treatment.badgeColor}`}
                  >
                    {treatment.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {treatment.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {treatment.description}
                </p>

                {/* Symptoms Covered Tags */}
                <div className="mb-5 space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    {isHi ? "प्रमुख संकेत / लक्षण:" : "Key Indicators:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {treatment.symptomsCovered.map((symptom, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                      >
                        <FiCheck className="text-emerald-500 text-[10px]" /> {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline Pill */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100/80 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 mb-6 font-medium">
                  <FiClock className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{treatment.reliefTimeline}</span>
                </div>
              </div>

              {/* Bottom CTA Link */}
              <Link
                to={`/appointment?concern=${encodeURIComponent(treatment.concernName)}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-300 hover:text-white font-bold text-xs transition duration-200"
              >
                <span>{isHi ? `${treatment.concernName} के लिए परामर्श लें` : `Consult for ${treatment.concernName}`}</span>
                <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-indigo-800/50">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold">
              {isHi
                ? "समझ नहीं आ रहा कि कौन सा उपचार आपके लक्षणों के अनुकूल है?"
                : "Unsure which constitutional category fits your symptoms?"}
            </h4>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              {isHi
                ? "30 मिनट का समग्र केस मूल्यांकन साक्षात्कार बुक करें। डॉ. राशी आपकी संपूर्ण शारीरिक रिपोर्ट व लक्षणों का अध्ययन करेंगी।"
                : "Book a holistic 30-minute case interview. Dr. Rashi will analyze your complete physical vitals and medical reports."}
            </p>
          </div>
          <Link
            to="/appointment"
            className="shrink-0 px-6 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md transition hover:scale-105"
          >
            {isHi ? "परामर्श सत्र शेड्यूल करें →" : "Schedule Intake Call →"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
