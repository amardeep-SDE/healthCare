// src/views/patient/PatientProfile.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiActivity,
  FiUploadCloud,
  FiFileText,
  FiDownload,
  FiTrash2,
  FiShield,
  FiEdit2,
  FiCheck,
  FiAlertCircle,
  FiPlus,
} from "react-icons/fi";
import { FaHeartbeat, FaNotesMedical, FaAllergies, FaVenusMars } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

// Memoized Stat Item
const VitalBadge = memo(({ label, value, unit, icon, statusColor = "text-indigo-600" }) => (
  <div className="bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
    <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-1">
      {icon}
      <span>{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-xl font-black ${statusColor}`}>{value}</span>
      {unit && <span className="text-xs text-gray-500 font-medium">{unit}</span>}
    </div>
  </div>
));
VitalBadge.displayName = "VitalBadge";

export const PatientProfile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("vitals"); // "vitals" | "homeopathy" | "reports"
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || "Ananya Sharma",
    email: user?.email || "ananya.sharma@example.com",
    phone: user?.phone || "+91 98765 11223",
    age: 26,
    dob: "1999-04-14",
    gender: "Female",
    bloodGroup: "O+",
    height: 165, // cm
    weight: 58, // kg
    address: "Flat 402, Green Valley Apts, Kolar Road, Bhopal, MP - 462042",
    emergencyContact: "+91 98222 33445 (Father - Rajesh Sharma)",
    // Homeopathic Specific Constitutional Data
    thermalPreference: "Chilly (Sensitive to cold wind & water)",
    allergies: ["Dust Mites", "Synthetic Detergents", "Sour curd"],
    chronicConditions: ["Atopic Dermatitis (Eczema)", "Mild Sinusitis"],
    familyHistory: "Mother has Psoriasis; Grandfather had Bronchial Asthma",
    dietHabits: "Vegetarian, Prefers sweet & salty foods, Appetite moderate",
    sleepQuality: "Troubled during skin itch flare-ups, usually 7 hours",
  });

  // Health Locker Uploaded Documents
  const [documents, setDocuments] = useState([
    {
      id: "DOC-101",
      title: "Complete Blood Count (CBC) & ESR",
      type: "Lab Report (PDF)",
      date: "2026-10-14",
      size: "2.4 MB",
      doctorNotes: "Elevated Eosinophil count indicative of allergic diathesis.",
    },
    {
      id: "DOC-102",
      title: "Skin Flare-up Photo (Neck & Forearms)",
      type: "Clinical Photo (JPG)",
      date: "2026-10-15",
      size: "1.2 MB",
      doctorNotes: "Initial visit baseline image. Erythematous dry scaly patch.",
    },
    {
      id: "DOC-103",
      title: "Serum IgE Allergy Profile Report",
      type: "Lab Report (PDF)",
      date: "2026-10-28",
      size: "3.1 MB",
      doctorNotes: "High IgE levels (340 IU/ml). Confirms atopic tendency.",
    },
  ]);

  // Upload modal state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState("Lab Report (PDF)");

  // Memoized BMI Calculation
  const bmiData = useMemo(() => {
    const heightInMeters = profileData.height / 100;
    if (heightInMeters <= 0) return { bmi: 0, status: "N/A", color: "text-gray-500" };
    const bmi = (profileData.weight / (heightInMeters * heightInMeters)).toFixed(1);

    if (bmi < 18.5) return { bmi, status: "Underweight", color: "text-amber-500" };
    if (bmi <= 24.9) return { bmi, status: "Healthy Weight", color: "text-emerald-500" };
    if (bmi <= 29.9) return { bmi, status: "Overweight", color: "text-amber-500" };
    return { bmi, status: "Obese", color: "text-rose-500" };
  }, [profileData.height, profileData.weight]);

  // Memoized Completeness Percentage
  const completeness = useMemo(() => {
    const fields = [
      profileData.name,
      profileData.email,
      profileData.phone,
      profileData.bloodGroup,
      profileData.thermalPreference,
      profileData.allergies.length,
      profileData.chronicConditions.length,
      profileData.familyHistory,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [profileData]);

  // Handlers with useCallback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveProfile = useCallback(
    (e) => {
      e.preventDefault();
      setIsEditing(false);
      toast.success("Medical profile updated successfully!");
    },
    []
  );

  const handleAddDocument = useCallback(
    (e) => {
      e.preventDefault();
      if (!uploadTitle.trim()) return;

      const newDoc = {
        id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
        title: uploadTitle,
        type: uploadType,
        date: new Date().toISOString().split("T")[0],
        size: "1.8 MB",
        doctorNotes: "Uploaded by patient for case evaluation.",
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setUploadTitle("");
      toast.success("Medical record uploaded to your Health Locker!");
    },
    [uploadTitle, uploadType]
  );

  const handleDeleteDocument = useCallback((id) => {
    if (window.confirm("Delete this document from your Health Locker?")) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast.success("Document removed.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={profileData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-indigo-100 dark:border-indigo-900 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
                Active
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900">
                  Patient ID: HP-PAT-8841
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Blood Group: {profileData.bloodGroup}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {profileData.name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Primary Doctor: <strong className="text-indigo-600 dark:text-indigo-400">Dr. Rashi Shrivastava (BHMS)</strong> • Registered Since Oct 2026
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
                <span className="flex items-center gap-1.5"><FiPhone /> {profileData.phone}</span>
                <span className="flex items-center gap-1.5"><FiMail /> {profileData.email}</span>
                <span className="flex items-center gap-1.5"><FiCalendar /> DOB: {profileData.dob} ({profileData.age} yrs)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition hover:scale-105"
            >
              <FiEdit2 /> {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>

            {/* Profile Completion Bar */}
            <div className="w-full md:w-48 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-400 font-medium">
              Medical Case Profile: {completeness}% Complete
            </span>
          </div>
        </div>

        {/* Quick Vitals Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <VitalBadge
            label="Height"
            value={profileData.height}
            unit="cm"
            icon={<FiActivity />}
          />
          <VitalBadge
            label="Weight"
            value={profileData.weight}
            unit="kg"
            icon={<FiActivity />}
          />
          <VitalBadge
            label="BMI Index"
            value={bmiData.bmi}
            unit={bmiData.status}
            icon={<FaHeartbeat />}
            statusColor={bmiData.color}
          />
          <VitalBadge
            label="Blood Group"
            value={profileData.bloodGroup}
            unit="RH Positive"
            icon={<FiShield />}
            statusColor="text-rose-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 overflow-x-auto">
          {[
            { id: "vitals", label: "Personal & Contact", icon: <FiUser /> },
            { id: "homeopathy", label: "Homeopathic Case History", icon: <FaNotesMedical /> },
            { id: "reports", label: "Health Locker & Reports", icon: <FiFileText /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Personal & Contact */}
        {activeTab === "vitals" && (
          <form onSubmit={handleSaveProfile} className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiUser className="text-indigo-600" /> Personal & Emergency Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  disabled={!isEditing}
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled={!isEditing}
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  disabled={!isEditing}
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  disabled={!isEditing}
                  value={profileData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Gender</label>
                <select
                  name="gender"
                  disabled={!isEditing}
                  value={profileData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  disabled={!isEditing}
                  value={profileData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  disabled={!isEditing}
                  value={profileData.height}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  disabled={!isEditing}
                  value={profileData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  disabled={!isEditing}
                  value={profileData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white disabled:opacity-75 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 font-semibold mb-1 text-xs sm:text-sm">
                Full Residential Address (for medicine delivery)
              </label>
              <textarea
                rows={2}
                name="address"
                disabled={!isEditing}
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs sm:text-sm dark:text-white disabled:opacity-75 outline-none"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition hover:scale-105"
                >
                  <FiCheck /> Save Changes
                </button>
              </div>
            )}
          </form>
        )}

        {/* Tab 2: Homeopathic Case History */}
        {activeTab === "homeopathy" && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaNotesMedical className="text-indigo-600" /> Homeopathic Constitutional Case Profile
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                In Classical Homeopathy, the patient's thermal reaction, food cravings, and family miasmatic history are crucial for finding the simillimum remedy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Thermal Preference */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-gray-700/40 border border-indigo-100 dark:border-gray-600">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  🌡️ Thermal Reaction (Hot / Chilly Patient)
                </span>
                <p className="text-gray-600 dark:text-gray-300">
                  {profileData.thermalPreference}
                </p>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-2">
                  Helps doctor differentiate between remedies like Hepar Sulph (Chilly) vs Sulphur (Hot).
                </span>
              </div>

              {/* Known Allergies */}
              <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900">
                <span className="font-bold text-rose-900 dark:text-rose-200 block mb-1 flex items-center gap-1.5">
                  <FaAllergies /> Known Allergies & Sensitivities
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.allergies.map((alg, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-rose-700 dark:text-rose-300 text-xs font-semibold shadow-sm border border-rose-200 dark:border-rose-800"
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chronic Illnesses */}
              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900">
                <span className="font-bold text-purple-900 dark:text-purple-200 block mb-1">
                  🩺 Chronic & Past Conditions
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.chronicConditions.map((cond, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 text-xs font-semibold shadow-sm border border-purple-200 dark:border-purple-800"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>

              {/* Family History */}
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  🧬 Family Health History (Miasmatic Background)
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  {profileData.familyHistory}
                </p>
              </div>
            </div>

            {/* General Habits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  🥗 Diet & Cravings
                </span>
                <p className="text-gray-600 dark:text-gray-400">{profileData.dietHabits}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  🌙 Sleep & Rest Patterns
                </span>
                <p className="text-gray-600 dark:text-gray-400">{profileData.sleepQuality}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Health Locker & Reports */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <FiUploadCloud className="text-indigo-600 text-xl" /> Upload New Medical Report or Condition Photo
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Attach blood test reports, allergy panels, or close-up photos of your skin/hair condition. Dr. Rashi inspects these before consultations.
              </p>

              <form onSubmit={handleAddDocument} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Document Title (e.g. Thyroid Panel Nov 2026)"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs sm:text-sm dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs sm:text-sm dark:text-white outline-none"
                >
                  <option value="Lab Report (PDF)">Lab Report (PDF)</option>
                  <option value="Clinical Photo (JPG)">Condition Photo (JPG/PNG)</option>
                  <option value="Previous Prescription">Past Prescription</option>
                  <option value="Other Medical Record">Other Record</option>
                </select>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition hover:scale-105"
                >
                  <FiPlus /> Upload to Locker
                </button>
              </form>
            </div>

            {/* Document List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Stored Documents ({documents.length})
              </h4>

              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-200 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold flex-shrink-0">
                      <FiFileText />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                          {doc.title}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
                          {doc.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Uploaded on {doc.date} • {doc.size}
                      </p>
                      {doc.doctorNotes && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                          <strong>Doctor's Observation:</strong> {doc.doctorNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => toast.success(`Downloading ${doc.title}...`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <FiDownload /> Download
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete document"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;

