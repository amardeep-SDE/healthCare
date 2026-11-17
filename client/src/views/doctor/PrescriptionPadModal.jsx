// src/views/doctor/PrescriptionPadModal.jsx
import React, { useState, useCallback, memo } from "react";
import { FiPlus, FiTrash2, FiSend } from "react-icons/fi";
import { FaPills } from "react-icons/fa";
import { Modal } from "../../components/common/Modal";
import { useAddPrescriptionMutation } from "../../hooks/useAppointmentsQuery";

export const PrescriptionPadModal = memo(({ isOpen, onClose, appointment }) => {
  const addMutation = useAddPrescriptionMutation();

  const [diagnosis, setDiagnosis] = useState(appointment?.concern || "Constitutional Analysis");
  const [medicines, setMedicines] = useState([
    {
      name: "Arnica Montana",
      potency: "200CH",
      form: "Globules / Pills (Size 30)",
      dosage: "4 pills twice daily",
      instructions: "Dissolve on tongue directly. Keep 30 min food gap.",
    },
  ]);
  const [dietRules, setDietRules] = useState(
    "Avoid raw onion, raw garlic, and strong coffee during the course.\nDrink adequate water."
  );
  const [followUpDate, setFollowUpDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  });

  const handleAddMedicineRow = useCallback(() => {
    setMedicines((prev) => [
      ...prev,
      {
        name: "",
        potency: "30C",
        form: "Globules / Pills (Size 30)",
        dosage: "4 pills twice daily",
        instructions: "Dissolve directly on tongue.",
      },
    ]);
  }, []);

  const handleRemoveMedicineRow = useCallback((index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleMedicineChange = useCallback((index, field, value) => {
    setMedicines((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis || medicines.length === 0) return;

    const payload = {
      appointmentId: appointment?.id,
      patientName: appointment?.patientName || "Patient",
      diagnosis,
      medicines,
      dietRestrictions: dietRules.split("\n").filter(Boolean),
      followUpDate,
    };

    await addMutation.mutateAsync(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Write Prescription • ${appointment?.patientName || "Patient"}`}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Diagnosis */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Clinical Diagnosis & Condition *
          </label>
          <input
            type="text"
            required
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g. Chronic Eczema / Migraine / IBS"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Medicines Dynamic Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              <FaPills className="text-indigo-600" /> Prescribed Homeopathic Remedies
            </label>
            <button
              type="button"
              onClick={handleAddMedicineRow}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition"
            >
              <FiPlus /> Add Remedy
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Remedy Name (e.g. Nux Vomica)"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs dark:bg-gray-900 dark:text-white"
                  />
                  <select
                    value={med.potency}
                    onChange={(e) => handleMedicineChange(idx, "potency", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs dark:bg-gray-900 dark:text-white"
                  >
                    <option value="6C">6C</option>
                    <option value="30C">30C</option>
                    <option value="200CH">200CH</option>
                    <option value="1M">1M (1000CH)</option>
                    <option value="10M">10M</option>
                    <option value="Q (Mother Tincture)">Q (Mother Tincture)</option>
                    <option value="Bio-combination">Bio-combination</option>
                  </select>
                  <select
                    value={med.form}
                    onChange={(e) => handleMedicineChange(idx, "form", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs dark:bg-gray-900 dark:text-white"
                  >
                    <option value="Globules / Pills (Size 30)">Globules / Pills (Size 30)</option>
                    <option value="Liquid Dilution Drops">Liquid Dilution Drops</option>
                    <option value="External Ointment">External Ointment</option>
                    <option value="Trituration Powder">Trituration Powder</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 4 pills morning & night)"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs dark:bg-gray-900 dark:text-white"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Special instructions (e.g. empty stomach)"
                      value={med.instructions}
                      onChange={(e) => handleMedicineChange(idx, "instructions", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs dark:bg-gray-900 dark:text-white"
                    />
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicineRow(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Homeopathic Dietary Precautions & Restrictions
          </label>
          <textarea
            rows={2}
            value={dietRules}
            onChange={(e) => setDietRules(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 dark:text-white outline-none"
          />
        </div>

        {/* Follow-up Date */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Suggested Next Follow-up Date
          </label>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full sm:w-60 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 dark:text-white outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
          >
            <FiSend /> {addMutation.isPending ? "Generating..." : "Issue & Send to Patient"}
          </button>
        </div>
      </form>
    </Modal>
  );
});

PrescriptionPadModal.displayName = "PrescriptionPadModal";

