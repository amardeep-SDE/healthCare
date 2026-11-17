// src/views/patient/HealthTracker.jsx
import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiPlusCircle,
} from "react-icons/fi";
import { FaHeartbeat, FaNotesMedical } from "react-icons/fa";
import { usePatientTracingQuery, useUpdateSymptomMutation } from "../../hooks/useAppointmentsQuery";

// Memoized Symptom Item to prevent re-rendering when one slider changes
const SymptomCard = memo(({ item, index, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
          {item.symptom}
        </h4>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            item.currentSeverity <= 3
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
              : item.currentSeverity <= 6
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
          }`}
        >
          Severity: {item.currentSeverity} / 10
        </span>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-xs text-gray-400">Mild (1)</span>
        <input
          type="range"
          min="1"
          max="10"
          value={item.currentSeverity}
          onChange={(e) => onUpdate(index, Number(e.target.value))}
          className="w-full accent-indigo-600 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
        />
        <span className="text-xs text-gray-400">Severe (10)</span>
      </div>

      <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-2">
        <span>Initial: {item.initialSeverity}/10</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
          {Math.round(((item.initialSeverity - item.currentSeverity) / item.initialSeverity) * 100)}% Improvement
        </span>
      </div>
    </div>
  );
});
SymptomCard.displayName = "SymptomCard";

export const HealthTracker = () => {
  const { data: tracing, isLoading } = usePatientTracingQuery();
  const updateMutation = useUpdateSymptomMutation();

  const handleSymptomChange = useCallback(
    (index, severity) => {
      updateMutation.mutate({ index, severity });
    },
    [updateMutation]
  );

  if (isLoading || !tracing) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Metric Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <FaHeartbeat /> Homeopathic Constitutional Health Tracker
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Patient Case: {tracing.patientName}
            </h2>
            <p className="text-indigo-100 text-sm mt-1 max-w-lg">
              Condition: <strong className="text-white">{tracing.primaryCondition}</strong> • Treatment Duration: {tracing.treatmentDuration}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-300"
                  strokeDasharray={`${tracing.overallImprovement}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black">{tracing.overallImprovement}%</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-200 block font-bold">
                Recovery Rate
              </span>
              <span className="text-lg font-bold text-white">Consistent Relief</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Symptom Progression Sliders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiActivity className="text-indigo-600" /> Dynamic Symptom Progress Meter
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Adjust sliders based on how you feel today. Changes auto-save in your medical profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tracing.symptomTracker.map((item, idx) => (
            <SymptomCard
              key={item.symptom}
              item={item}
              index={idx}
              onUpdate={handleSymptomChange}
            />
          ))}
        </div>
      </div>

      {/* Case Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FaNotesMedical className="text-indigo-600" /> Case Progression Timeline & Follow-ups
        </h3>

        <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-gray-700 space-y-6">
          {tracing.timeline.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${
                  event.status === "Completed"
                    ? "bg-emerald-500 shadow-md shadow-emerald-500/40"
                    : "bg-indigo-600 animate-pulse"
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <span className="font-bold text-gray-900 dark:text-white text-sm">
                  {event.type}
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                  <FiCalendar /> {event.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {event.notes}
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
                Remedy Given: {event.remedy}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Regular follow-ups ensure accurate potency titration in homeopathy.
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition hover:scale-105"
          >
            <FiPlusCircle /> Book Next Follow-up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;

