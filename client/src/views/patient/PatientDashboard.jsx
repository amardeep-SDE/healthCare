// src/views/patient/PatientDashboard.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiActivity,
  FiFileText,
  FiShoppingCart,
  FiArrowRight,
  FiCheckCircle,
  FiVideo,
} from "react-icons/fi";
import { FaHeartbeat, FaNotesMedical, FaPills } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { useAppointmentsQuery, usePatientTracingQuery, usePrescriptionsQuery } from "../../hooks/useAppointmentsQuery";
import { useCartStore } from "../../store/useCartStore";
import HealthTracker from "./HealthTracker";
import PrescriptionVault from "./PrescriptionVault";
import MyAppointments from "./MyAppointments";

export const PatientDashboard = () => {
  const {user} = useAuthStore();
      const [activeTab, setActiveTab] = useState("overview"); // "overview" | "tracker" | "prescriptions" | "appointments"

      const {data: appointments = [] } = useAppointmentsQuery();
      const {data: tracing } = usePatientTracingQuery();
      const {data: prescriptions = [] } = usePrescriptionsQuery();
      const {orders} = useCartStore();

  // Next Upcoming Appointment - Memoized
  const nextAppointment = useMemo(() => {
    return appointments.find((a) => a.status === "Confirmed");
  }, [appointments]);

                  return (
                  <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                      {/* Welcome Header */}
                      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                          <div className="flex items-center gap-5">
                            <img
                              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                              alt={user?.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/50 shadow-md"
                            />
                            <div>
                              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                                Patient Health Portal
                              </span>
                            <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">
                              Welcome back, {user?.name || "Patient"} 👋
                            </h1>
                            <p className="text-xs sm:text-sm text-indigo-100 mt-1">
                              Dr. Rashi Shrivastava • Holistic Homeopathic Care
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            to="/patient/profile"
                            className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition hover:scale-105"
                          >
                            My Health Profile
                          </Link>
                          <Link
                            to="/appointment"
                            className="px-5 py-2.5 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-md transition hover:scale-105"
                          >
                            + Book Consultation
                          </Link>
                          <Link
                            to="/medicines"
                            className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 transition"
                          >
                            Dispensary Store
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Quick KPI Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div
                        onClick={() => setActiveTab("appointments")}
                        className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-300 transition"
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg mb-3">
                          <FiCalendar />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Booked Appointments</span>
                        <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                          {appointments.length}
                        </div>
                      </div>

                        <div
                          onClick={() => setActiveTab("tracker")}
                          className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-300 transition"
                        >
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3">
                            <FiActivity />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Symptom Recovery</span>
                          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                            {tracing?.overallImprovement || 70}%
                          </div>
                        </div>

          <div
                          onClick={() => setActiveTab("prescriptions")}
                          className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-300 transition"
                        >
                        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3">
                          <FiFileText />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Prescriptions</span>
                        <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                          {prescriptions.length}
                        </div>
                      </div>

          <Link
                        to="/orders"
                        className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-300 transition block"
                      >
                      <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg mb-3">
                        <FiShoppingCart />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Medicine Orders</span>
                      <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                        {orders.length}
                      </div>
                    </Link>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 overflow-x-auto">
                    {[
                      { id: "overview", label: "Dashboard Overview", icon: <FaHeartbeat /> },
                      { id: "tracker", label: "Health & Symptom Tracker", icon: <FiActivity /> },
                      { id: "prescriptions", label: "Digital Prescriptions", icon: <FiFileText /> },
                      { id: "appointments", label: "My Appointments", icon: <FiCalendar /> },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${activeTab === tab.id
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Views */}
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left 2 Cols: Next Visit & Tracing Preview */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Next Appointment Card */}
                        {nextAppointment && (
                          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-indigo-100 dark:border-gray-700 shadow-md">
                            <div className="flex items-center justify-between mb-4">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                Next Confirmed Visit
                              </span>
                              <span className="text-xs text-gray-400 font-mono">{nextAppointment.id}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  {nextAppointment.concern}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  📅 <strong>{nextAppointment.date}</strong> at <strong>{nextAppointment.timeSlot}</strong> ({nextAppointment.mode})
                                </p>
                              </div>

                              {nextAppointment.mode.includes("Online") && (
                                <Link
                                  to={`/consultation/${nextAppointment.id}`}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition hover:scale-105"
                                >
                                  <FiVideo /> Enter Video Room
                                </Link>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Health Tracker Embed */}
                        <HealthTracker />
                      </div>

                      {/* Right 1 Col: Prescriptions & Recent Orders Quick Widget */}
                      <div className="space-y-6">
                        {/* Active Prescriptions Widget */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                              <FaPills className="text-indigo-600" /> Current Prescriptions
                            </h3>
                            <button
                              onClick={() => setActiveTab("prescriptions")}
                              className="text-xs text-indigo-600 hover:underline font-semibold"
                            >
                              View All
                            </button>
                          </div>

                          {prescriptions.length === 0 ? (
                            <p className="text-xs text-gray-400">No active prescriptions yet.</p>
                          ) : (
                            <div className="space-y-3">
                              {prescriptions[0]?.medicines.map((med, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 text-xs border border-gray-100 dark:border-gray-600"
                                >
                                  <div className="flex justify-between font-bold text-gray-800 dark:text-gray-200">
                                    <span>{med.name}</span>
                                    <span className="text-indigo-600 font-mono">{med.potency}</span>
                                  </div>
                                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">{med.dosage}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Medicine Orders Widget */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                              <FiShoppingCart className="text-indigo-600" /> Dispensary Orders
                            </h3>
                            <Link to="/orders" className="text-xs text-indigo-600 hover:underline font-semibold">
                              Track
                            </Link>
                          </div>

                          {orders.length === 0 ? (
                            <p className="text-xs text-gray-400">No recent orders placed.</p>
                          ) : (
                            <div className="space-y-3">
                              {orders.slice(0, 2).map((ord) => (
                                <div
                                  key={ord.id}
                                  className="p-3.5 rounded-xl bg-indigo-50/40 dark:bg-gray-700/40 border border-indigo-100 dark:border-gray-600 text-xs"
                                >
                                  <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                                    <span>{ord.id}</span>
                                    <span className="text-emerald-600 font-semibold">{ord.status}</span>
                                  </div>
                                  <p className="text-gray-500 dark:text-gray-400 mt-1 truncate">
                                    {ord.items.map((i) => i.name).join(", ")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "tracker" && <HealthTracker />}
                  {activeTab === "prescriptions" && <PrescriptionVault />}
                  {activeTab === "appointments" && <MyAppointments />}
                </div>
            </div>
            );
};

            export default PatientDashboard;
