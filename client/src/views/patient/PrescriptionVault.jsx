// src/views/patient/PrescriptionVault.jsx
import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiDownload, FiShoppingCart, FiClock, FiAlertCircle } from "react-icons/fi";
import { FaUserMd, FaPills } from "react-icons/fa";
import { usePrescriptionsQuery } from "../../hooks/useAppointmentsQuery";
import { useCartStore } from "../../store/useCartStore";
import toast from "react-hot-toast";

const PrescriptionCard = memo(({ rx, onOrderMedicines }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {rx.id}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-semibold">
              Active Prescription
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            Diagnosis: {rx.diagnosis}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Consulted with {rx.doctor} on {rx.date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              window.open(`http://localhost:5000/api/prescriptions/${rx.id || rx._id || "RX-101"}/pdf`, "_blank");
              toast.success("Opening official Doctor Prescription PDF...");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-xs"
          >
            <FiDownload /> Official Rx PDF
          </button>
          <button
            onClick={() => onOrderMedicines(rx)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition hover:scale-105"
          >
            <FiShoppingCart /> Order Medicines
          </button>
        </div>
      </div>

      {/* Medicines List */}
      <div className="mt-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Prescribed Homeopathic Remedies
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {rx.medicines.map((med, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-gray-700/40 border border-indigo-100 dark:border-gray-600 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {med.name}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                    {med.potency}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Form: {med.form}
                </p>
                <div className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Dosage: {med.dosage}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-400 mt-2 italic border-t border-gray-200 dark:border-gray-600 pt-1.5">
                {med.instructions}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary Precautions */}
      {rx.dietRestrictions && rx.dietRestrictions.length > 0 && (
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
          <h5 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-1.5">
            <FiAlertCircle /> Homeopathic Dietary Rules (Strict Guidelines):
          </h5>
          <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-300">
            {rx.dietRestrictions.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
PrescriptionCard.displayName = "PrescriptionCard";

export const PrescriptionVault = () => {
  const { data: prescriptions, isLoading } = usePrescriptionsQuery();
  const { addToCart } = useCartStore();

  const handleOrderMedicines = useCallback(
    (rx) => {
      // Add a bundled item for this prescription
      addToCart({
        id: `rx-bundle-${rx.id}`,
        name: `Prescribed Remedy Pack (${rx.diagnosis})`,
        category: "Prescription Batch",
        price: 490,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80",
        description: `Custom formulated batch prepared by Dr. Rashi's clinic for ${rx.patientName}`,
      });
      toast.success("Prescription remedies added to your cart!");
    },
    [addToCart]
  );

  if (isLoading || !prescriptions) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Digital Prescriptions & Treatment History
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Access verified homeopathic prescriptions and order directly from the clinic dispensary.
          </p>
        </div>

        <Link
          to="/medicines"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition hover:scale-105"
        >
          <FiShoppingCart /> Open Dispensary Store
        </Link>
      </div>

      <div className="space-y-6">
        {prescriptions.map((rx) => (
          <PrescriptionCard
            key={rx.id}
            rx={rx}
            onOrderMedicines={handleOrderMedicines}
          />
        ))}
      </div>
    </div>
  );
};

export default PrescriptionVault;

