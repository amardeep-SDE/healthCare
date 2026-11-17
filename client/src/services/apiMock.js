// src/services/apiMock.js
import {
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_PATIENT_TRACING,
  MEDICINE_STORE_ITEMS,
  ALL_PATIENTS_DIRECTORY,
  INITIAL_ORDERS,
} from "../data/homeopathyData";

// Helper to simulate network delay for TanStack Query
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Local in-memory / storage sync
const getStoredData = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      // fallback
    }
  }
  return fallback;
};

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  // Appointments
  async fetchAppointments() {
    await delay(250);
    return getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
  },

  async bookAppointment(newApp) {
    await delay(350);
    const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
    const created = {
      id: `DRR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      paymentStatus: "Paid",
      meetingLink: newApp.mode.includes("Online")
        ? `https://meet.google.com/hpc-${Math.random().toString(36).substring(2, 7)}`
        : null,
      prescriptionGiven: false,
      ...newApp,
    };
    const updated = [created, ...existing];
    setStoredData("hp_appointments_api", updated);
    return created;
  },

  async updateAppointmentStatus({ id, status }) {
    await delay(200);
    const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
    const updated = existing.map((app) =>
      app.id === id ? { ...app, status } : app
    );
    setStoredData("hp_appointments_api", updated);
    return { id, status };
  },

  // Prescriptions
  async fetchPrescriptions() {
    await delay(250);
    return getStoredData("hp_prescriptions_api", INITIAL_PRESCRIPTIONS);
  },

  async addPrescription(prescription) {
    await delay(350);
    const existing = getStoredData("hp_prescriptions_api", INITIAL_PRESCRIPTIONS);
    const created = {
      id: `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0],
      doctor: "Dr. Rashi Shrivastava",
      ...prescription,
    };
    const updated = [created, ...existing];
    setStoredData("hp_prescriptions_api", updated);

    // Also mark appointment
    if (prescription.appointmentId) {
      const appointments = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
      const appUpdated = appointments.map((app) =>
        app.id === prescription.appointmentId ? { ...app, prescriptionGiven: true } : app
      );
      setStoredData("hp_appointments_api", appUpdated);
    }

    return created;
  },

  // Patient Health Tracing
  async fetchPatientTracing() {
    await delay(250);
    return getStoredData("hp_patient_tracing_api", INITIAL_PATIENT_TRACING);
  },

  async updateSymptomSeverity({ index, severity }) {
    await delay(250);
    const tracing = getStoredData("hp_patient_tracing_api", INITIAL_PATIENT_TRACING);
    const updatedSymptoms = [...tracing.symptomTracker];
    updatedSymptoms[index].currentSeverity = severity;

    const totalInitial = updatedSymptoms.reduce((acc, s) => acc + s.initialSeverity, 0);
    const totalCurrent = updatedSymptoms.reduce((acc, s) => acc + s.currentSeverity, 0);
    const improvement = Math.round(((totalInitial - totalCurrent) / totalInitial) * 100);

    const updatedTracing = {
      ...tracing,
      symptomTracker: updatedSymptoms,
      overallImprovement: Math.max(0, Math.min(100, improvement)),
    };
    setStoredData("hp_patient_tracing_api", updatedTracing);
    return updatedTracing;
  },

  // Medicines Catalog
  async fetchMedicines() {
    await delay(250);
    return MEDICINE_STORE_ITEMS;
  },

  // Patients Directory (For Dr. Rashi's EMR / 1000+ Patient Management)
  async fetchPatientsDirectory() {
    await delay(300);
    return getStoredData("hp_patients_directory_api", ALL_PATIENTS_DIRECTORY);
  },

  async updatePatientNote({ id, doctorNote }) {
    await delay(250);
    const patients = getStoredData("hp_patients_directory_api", ALL_PATIENTS_DIRECTORY);
    const updated = patients.map((p) =>
      p.id === id ? { ...p, doctorNotes: doctorNote } : p
    );
    setStoredData("hp_patients_directory_api", updated);
    return { id, doctorNote };
  },

  // Doctor Super Admin Dispensary Orders
  async fetchDoctorOrders() {
    await delay(250);
    return getStoredData("hp_orders", INITIAL_ORDERS);
  },

  async updateOrderStatus({ id, status }) {
    await delay(200);
    const orders = getStoredData("hp_orders", INITIAL_ORDERS);
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setStoredData("hp_orders", updated);
    return { id, status };
  },
};
