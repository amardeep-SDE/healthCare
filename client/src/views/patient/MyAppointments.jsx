// src/views/patient/MyAppointments.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
FiCalendar,
  FiClock,
  FiVideo,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiPlusCircle,
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser } from "react-icons/fa";
import { useAppointmentsQuery, useUpdateAppointmentMutation } from "../../hooks/useAppointmentsQuery";
import { useDebounce } from "../../hooks/useDebounce";
import { Badge } from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatters";

      // Memoized Appointment Card for rendering optimization
      const AppointmentCard = memo(({ app, onCancel }) => {
        return (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold">
                  {app.mode.includes("Online") ? <FiVideo /> : <FaHospitalUser />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">
                      {app.id}
                    </span>
                    <Badge status={app.status} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    {app.concern || "Consultation with Dr. Rashi"}
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Consultation Fee</span>
                <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(app.fee || 500)}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium block">
                  {app.paymentStatus === "Paid" ? "✓ Paid Online" : "Payment Pending"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-indigo-600 flex-shrink-0" />
                <span>Date: <strong>{app.date}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-indigo-600 flex-shrink-0" />
                <span>Slot: <strong>{app.timeSlot || "11:30 AM"}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                {app.mode.includes("Online") ? (
                  <FiVideo className="text-blue-600 flex-shrink-0" />
                ) : (
                  <FiMapPin className="text-emerald-600 flex-shrink-0" />
                )}
                <span>Mode: <strong>{app.mode}</strong></span>
              </div>
            </div>

            {app.symptoms && (
              <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl mb-4">
                <strong className="text-gray-700 dark:text-gray-300">Symptoms noted:</strong> {app.symptoms}
              </p>
            )}

            {/* Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-gray-400">
                Doctor: <strong>Dr. Rashi Shrivastava (BHMS)</strong>
              </div>

              <div className="flex items-center gap-2">
                {app.mode.includes("Online") && app.status !== "Cancelled" && (
                  <Link
                    to={`/consultation/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition hover:scale-105"
                  >
                    <FiVideo /> Enter Video Room
                  </Link>
                )}

                {app.status === "Confirmed" && (
                  <button
                    onClick={() => onCancel(app.id)}
                    className="px-3.5 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-medium text-gray-600 dark:text-gray-400 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      });
      AppointmentCard.displayName = "AppointmentCard";

      export const MyAppointments = () => {
        const { data: appointments = [], isLoading } = useAppointmentsQuery();
        const updateMutation = useUpdateAppointmentMutation();

        const [activeFilter, setActiveFilter] = useState("All");
        const [searchQuery, setSearchQuery] = useState("");
        const debouncedSearch = useDebounce(searchQuery, 300);

        // Cancellation callback with useCallback
        const handleCancel = useCallback(
          (id) => {
            if (window.confirm("Are you sure you want to cancel this appointment?")) {
              updateMutation.mutate({ id, status: "Cancelled" });
            }
          },
  [updateMutation]
  );

// Memoized Filtered List
const filteredAppointments = useMemo(() => {
  return appointments.filter((app) => {
    const matchesFilter =
      activeFilter === "All" ||
      app.status?.toLowerCase() === activeFilter.toLowerCase();

    const matchesSearch =
      !debouncedSearch ||
      app.concern?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      app.id?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      app.patientName?.toLowerCase().includes(debouncedSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}, [appointments, activeFilter, debouncedSearch]);

return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              My Consultations & Appointments
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track your scheduled visits, join online video sessions, and manage your bookings.
            </p>
          </div>

          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition hover:scale-105"
          >
            <FiPlusCircle /> Book New Consultation
          </Link>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                    {["All", "Confirmed", "Pending", "Cancelled"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeFilter === tab
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                      >
                { tab }
              </button>
            ))}
                </div>

                  <div className="relative w-full sm:w-64">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

        {/* Appointments List */ }
        {
                isLoading?(
          <div className = "min-h-[250px] flex items-center justify-center" >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl mx-auto mb-4">
            <FiCalendar />
          </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        No Appointments Found
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
        You do not have any appointments matching this filter. Schedule a new consultation with Dr. Rashi.
      </p>
      <Link
        to="/appointment"
        className="inline-block mt-5 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold"
      >
        Book Now
      </Link>
    </div>
    ) : (
    <div className="space-y-4">
      {filteredAppointments.map((app) => (
        <AppointmentCard key={app.id} app={app} onCancel={handleCancel} />
      ))}
    </div>
        )}
  </div>
    </div >
  );
};

export default MyAppointments;
