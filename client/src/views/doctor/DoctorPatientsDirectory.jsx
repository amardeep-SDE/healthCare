// src/views/doctor/DoctorPatientsDirectory.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiActivity,
  FiPlus,
  FiCheckCircle,
  FiEdit3,
  FiSave,
  FiX,
  FiShield,
  FiDownload,
} from "react-icons/fi";
import { FaUserMd, FaNotesMedical, FaHeartbeat, FaAllergies, FaPills } from "react-icons/fa";
import { usePatientsDirectoryQuery, useUpdatePatientNoteMutation } from "../../hooks/useAppointmentsQuery";
import { useDebounce } from "../../hooks/useDebounce";
import { PrescriptionPadModal } from "./PrescriptionPadModal";
import toast from "react-hot-toast";

// 360° Comprehensive Patient Case File Modal
const PatientEMRModal = memo(({ patient, isOpen, onClose, onOpenPrescription }) => {
  const updateNoteMutation = useUpdatePatientNoteMutation();
  const [activeTab, setActiveTab] = useState("casesheet"); // "casesheet" | "notes" | "timeline"
  const [note, setNote] = useState(patient?.doctorNotes || "");
  const [isEditingNote, setIsEditingNote] = useState(false);

  if (!isOpen || !patient) return null;

  const handleSaveNote = async () => {
    await updateNoteMutation.mutateAsync({ id: patient.id, doctorNote: note });
    setIsEditingNote(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer / Modal */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-indigo-300 shadow-md flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/20">
                  {patient.id}
                </span>
                <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
                  {patient.treatmentStatus}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black mt-1">
                {patient.name} ({patient.gender}, {patient.age} yrs)
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-200 mt-0.5">
                📍 {patient.city} • 📞 {patient.phone} • Blood: {patient.bloodGroup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onOpenPrescription(patient)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition hover:scale-105"
            >
              <FaPills /> Write Rx
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 sm:pt-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { id: "casesheet", label: "Constitutional Case Sheet", icon: <FaNotesMedical /> },
            { id: "notes", label: "Doctor Clinical Observations", icon: <FiEdit3 /> },
            { id: "timeline", label: "Treatment History & Remedy", icon: <FiActivity /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-900 rounded-t-xl"
                  : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {activeTab === "casesheet" && (
            <div className="space-y-6">
              {/* Diagnosis summary banner */}
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider text-indigo-600 font-bold block">
                    Chief Complaint & Pathology
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    {patient.condition}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {patient.symptomsBrief}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">Recovery Score</span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {patient.improvementScore}%
                  </span>
                </div>
              </div>

              {/* Constitutional Generals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    🌡️ Thermal Preference (Homeopathic General)
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {patient.thermalPreference}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900">
                  <h4 className="font-bold text-rose-900 dark:text-rose-200 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FaAllergies /> Allergies & Intolerances
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies?.map((a, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-white dark:bg-gray-900 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-800"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 md:col-span-2">
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs uppercase tracking-wider mb-2">
                    🧬 Family History & Miasmatic Background
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {patient.familyHistory}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiEdit3 className="text-indigo-600" /> Dr. Rashi's Confidential Case Notes
                </h3>
                {!isEditingNote ? (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold"
                  >
                    Edit Note
                  </button>
                ) : (
                  <button
                    onClick={handleSaveNote}
                    disabled={updateNoteMutation.isPending}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow transition hover:scale-105"
                  >
                    <FiSave /> Save Note
                  </button>
                )}
              </div>

              {isEditingNote ? (
                <textarea
                  rows={6}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs sm:text-sm bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Record your clinical observations, potency titrations, modalities..."
                />
              ) : (
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {patient.doctorNotes || "No notes recorded yet. Click 'Edit Note' to add observations."}
                </div>
              )}
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-gray-800/60 border border-indigo-100 dark:border-gray-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Currently Prescribed Remedy:</span>
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                    {patient.currentRemedy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Consultations Attended:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {patient.totalVisits} Visits
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Registered Date:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {patient.registeredDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Scheduled Review:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    📅 {patient.nextFollowUp}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
PatientEMRModal.displayName = "PatientEMRModal";

export const DoctorPatientsDirectory = () => {
  const { data: patients = [], isLoading } = usePatientsDirectoryQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");

  // Selected patient for 360° modal
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected appointment/patient for Prescription modal
  const [selectedForRx, setSelectedForRx] = useState(null);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);

  const handleOpenEMR = useCallback((pat) => {
    setSelectedPatient(pat);
    setIsModalOpen(true);
  }, []);

  const handleOpenPrescription = useCallback((pat) => {
    setSelectedForRx({
      id: `DIR-${pat.id}`,
      patientName: pat.name,
      concern: pat.condition,
    });
    setIsRxModalOpen(true);
  }, []);

  // Memoized Filtered Patients (Supports 1000s of records smoothly)
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesStatus =
        filterStatus === "All" || p.treatmentStatus === filterStatus;

      const matchesCondition =
        selectedCondition === "All" ||
        p.condition.toLowerCase().includes(selectedCondition.toLowerCase());

      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        !debouncedSearch ||
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.phone.includes(query) ||
        p.condition.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query);

      return matchesStatus && matchesCondition && matchesSearch;
    });
  }, [patients, filterStatus, selectedCondition, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <FaUserMd /> Dr. Rashi's Electronic Medical Records (EMR)
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              Patient Directory & Clinical Case Records
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-2 max-w-xl">
              Search, inspect, and manage complete constitutional health records, case sheets, prescriptions, and recovery timelines for all registered patients.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div>
              <span className="text-xs text-indigo-200 block font-semibold">Total Patient Base</span>
              <span className="text-3xl font-black text-white">{patients.length * 300}+</span>
              <span className="text-[11px] text-emerald-300 block">Indexed & Searchable</span>
            </div>
          </div>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search by Patient Name, Phone, ID, or Pathology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs sm:text-sm bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 w-full md:w-auto">
              {["All", "Active Treatment", "Cured / Stable"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    filterStatus === st
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patients Table / Grid */}
        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 font-semibold">No patient records found matching your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.map((pat) => (
              <div
                key={pat.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pat.avatar}
                        alt={pat.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-100 dark:border-indigo-900"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            {pat.id}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold">
                            {pat.treatmentStatus}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-base mt-0.5">
                          {pat.name}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            ({pat.gender}, {pat.age}y)
                          </span>
                        </h3>
                        <p className="text-xs text-gray-400">
                          📞 {pat.phone} • 📍 {pat.city}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-medium">Recovery</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {pat.improvementScore}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/30 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Condition:</span>
                      <strong className="text-gray-900 dark:text-white truncate max-w-[200px]">
                        {pat.condition}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Current Remedy:</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {pat.currentRemedy}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Next Follow-up:</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {pat.nextFollowUp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {pat.totalVisits} Consultations logged
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEMR(pat)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition hover:scale-105"
                    >
                      Open Case File
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 360° EMR Modal */}
      <PatientEMRModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenPrescription={handleOpenPrescription}
      />

      {/* Prescription Pad Modal */}
      <PrescriptionPadModal
        isOpen={isRxModalOpen}
        onClose={() => setIsRxModalOpen(false)}
        appointment={selectedForRx}
      />
    </div>
  );
};

export default DoctorPatientsDirectory;

