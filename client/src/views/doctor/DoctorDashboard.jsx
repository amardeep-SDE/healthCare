// src/views/doctor/DoctorDashboard.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiCalendar,
  FiClock,
  FiVideo,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiDollarSign,
  FiActivity,
  FiPlus,
  FiShield,
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser, FaPills } from "react-icons/fa";
import { DOCTOR_INFO } from "../../data/homeopathyData";
import { useAppointmentsQuery, useUpdateAppointmentMutation } from "../../hooks/useAppointmentsQuery";
import { useDebounce } from "../../hooks/useDebounce";
import { Badge } from "../../components/common/Badge";
import { PrescriptionPadModal } from "./PrescriptionPadModal";
import { formatCurrency } from "../../utils/formatters";

// Memoized Queue Row
const PatientQueueRow = memo(({ app, onOpenPrescription, onStatusChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      {/* Patient info */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold flex-shrink-0">
          {app.mode.includes("Online") ? <FiVideo /> : <FaHospitalUser />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">
              {app.id}
            </span>
            <Badge status={app.status} />
            <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
              {app.mode}
            </span>
          </div>

          <h4 className="text-base font-bold text-gray-900 dark:text-white mt-1">
            {app.patientName}{" "}
            <span className="text-xs font-normal text-gray-500">
              ({app.patientGender || "Female"}, {app.patientAge || "26"} yrs) • {app.patientPhone}
            </span>
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <strong>Chief Complaint:</strong> {app.concern} — {app.symptoms || "Follow-up case review"}
          </p>
        </div>
      </div>

      {/* Time & Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100 dark:border-gray-700">
        <div className="text-left lg:text-right mr-2">
          <span className="text-xs text-gray-400 block">Scheduled Slot</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {app.date} • {app.timeSlot || "11:30 AM"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {app.mode.includes("Online") && (
            <a
              href={app.meetingLink || "https://meet.google.com/hpc-demo-call"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition hover:scale-105"
            >
              <FiVideo /> Start Call
            </a>
          )}

          <button
            onClick={() => onOpenPrescription(app)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition hover:scale-105"
          >
            <FiFileText /> Write Rx
          </button>

          {app.status === "Confirmed" && (
            <button
              onClick={() => onStatusChange(app.id, "Delivered")}
              title="Mark Completed"
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 transition"
            >
              <FiCheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
PatientQueueRow.displayName = "PatientQueueRow";

export const DoctorDashboard = () => {
  const { data: appointments = [], isLoading } = useAppointmentsQuery();
  const updateMutation = useUpdateAppointmentMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [filterMode, setFilterMode] = useState("All");

  // Selected appointment for writing prescription modal
  const [selectedAppForRx, setSelectedAppForRx] = useState(null);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);

  // Callbacks
  const handleOpenPrescription = useCallback((app) => {
    setSelectedAppForRx(app);
    setIsRxModalOpen(true);
  }, []);

  const handleStatusChange = useCallback(
    (id, status) => {
      updateMutation.mutate({ id, status });
    },
    [updateMutation]
  );

  // Memoized KPI metrics
  const stats = useMemo(() => {
    const totalAppointments = appointments.length;
    const onlineCalls = appointments.filter((a) => a.mode?.includes("Online")).length;
    const clinicVisits = appointments.filter((a) => a.mode?.includes("Clinic")).length;
    const revenue = appointments.reduce((sum, a) => sum + (a.fee || 500), 0);

    return { totalAppointments, onlineCalls, clinicVisits, revenue };
  }, [appointments]);

  // Memoized Filtered Queue
  const filteredQueue = useMemo(() => {
    return appointments.filter((app) => {
      const matchesMode =
        filterMode === "All" ||
        (filterMode === "Online" && app.mode?.includes("Online")) ||
        (filterMode === "Clinic" && app.mode?.includes("Clinic"));

      const matchesSearch =
        !debouncedSearch ||
        app.patientName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        app.concern?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        app.id?.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesMode && matchesSearch;
    });
  }, [appointments, filterMode, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={DOCTOR_INFO.avatar}
                alt={DOCTOR_INFO.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
              />
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
                  <FiShield /> Certified Practitioner • {DOCTOR_INFO.regNo}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold">{DOCTOR_INFO.name}</h1>
                <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">
                  {DOCTOR_INFO.qualification} • {DOCTOR_INFO.clinicName}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/doctor/patients"
                className="px-5 py-2.5 rounded-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-md transition hover:scale-105 flex items-center gap-1.5"
              >
                <FiUsers /> Patients Directory (EMR)
              </Link>
              <Link
                to="/doctor/orders"
                className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm border border-white/30 transition flex items-center gap-1.5"
              >
                <FaPills /> Dispensary Orders
              </Link>
              <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                Clinic Live
              </span>
            </div>
          </div>
        </div>

        {/* Doctor KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg mb-3">
              <FiCalendar />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Bookings</span>
            <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {stats.totalAppointments}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg mb-3">
              <FiVideo />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Online Video Calls</span>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {stats.onlineCalls}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3">
              <FaHospitalUser />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">In-Clinic Consults</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.clinicVisits}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3">
              <FiDollarSign />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Consultation Revenue</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {formatCurrency(stats.revenue)}
            </div>
          </div>
        </div>

        {/* Patient Consultation Queue */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                Patient Consultation Queue
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Review scheduled patients, initiate instant video consultations, and issue digital prescriptions.
              </p>
            </div>

            {/* Filter buttons & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                {["All", "Online", "Clinic"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setFilterMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      filterMode === m
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="relative w-56">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search patient / symptom..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Queue Rows */}
          {isLoading ? (
            <div className="min-h-[250px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredQueue.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                No patients in queue matching this filter.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQueue.map((app) => (
                <PatientQueueRow
                  key={app.id}
                  app={app}
                  onOpenPrescription={handleOpenPrescription}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prescription Pad Modal */}
      <PrescriptionPadModal
        isOpen={isRxModalOpen}
        onClose={() => setIsRxModalOpen(false)}
        appointment={selectedAppForRx}
      />
    </div>
  );
};

export default DoctorDashboard;

