// src/services/api.js
import {
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_PATIENT_TRACING,
  MEDICINE_STORE_ITEMS,
  ALL_PATIENTS_DIRECTORY,
  INITIAL_ORDERS,
} from "../data/homeopathyData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Local storage helper with fallbacks
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
  // ==========================================
  // 1. Appointments API
  // ==========================================
  async fetchAppointments() {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) throw new Error("Server response not ok");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map _id and appointmentCode to id for frontend compatibility
        const formatted = data.map((a) => ({
          ...a,
          id: a.appointmentCode || a._id,
        }));
        setStoredData("hp_appointments_api", formatted);
        return formatted;
      }
    } catch (err) {
      console.warn("⚠️ API offline or unreachable, using local storage fallback:", err.message);
    }
    return getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
  },

  async bookAppointment(newApp) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const saved = await res.json();
        const created = {
          ...saved,
          id: saved.appointmentCode || saved._id,
        };
        const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
        setStoredData("hp_appointments_api", [created, ...existing]);
        return created;
      }
    } catch (err) {
      console.warn("⚠️ Booking via local fallback:", err.message);
    }

    // Local fallback
    const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
    const created = {
      id: `DRR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      paymentStatus: "Paid",
      meetingLink: newApp.mode?.includes("Online")
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
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const updatedDoc = await res.json();
        const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
        const updated = existing.map((app) =>
          app.id === id || app._id === id ? { ...app, status } : app
        );
        setStoredData("hp_appointments_api", updated);
        return updatedDoc;
      }
    } catch (err) {
      console.warn("⚠️ Status update via local fallback:", err.message);
    }

    const existing = getStoredData("hp_appointments_api", INITIAL_APPOINTMENTS);
    const updated = existing.map((app) =>
      app.id === id ? { ...app, status } : app
    );
    setStoredData("hp_appointments_api", updated);
    return { id, status };
  },

  // ==========================================
  // 2. Prescriptions API
  // ==========================================
  async fetchPrescriptions() {
    try {
      const res = await fetch(`${API_BASE_URL}/prescriptions`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) throw new Error("Server response not ok");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((rx) => ({
          ...rx,
          id: rx.rxCode || rx._id,
        }));
        setStoredData("hp_prescriptions_api", formatted);
        return formatted;
      }
    } catch (err) {
      console.warn("⚠️ Prescriptions offline fallback:", err.message);
    }
    return getStoredData("hp_prescriptions_api", INITIAL_PRESCRIPTIONS);
  },

  async addPrescription(prescription) {
    try {
      const res = await fetch(`${API_BASE_URL}/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prescription),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const saved = await res.json();
        const created = {
          ...saved,
          id: saved.rxCode || saved._id,
          date: saved.createdAt ? saved.createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
        };
        const existing = getStoredData("hp_prescriptions_api", INITIAL_PRESCRIPTIONS);
        setStoredData("hp_prescriptions_api", [created, ...existing]);
        return created;
      }
    } catch (err) {
      console.warn("⚠️ Prescription creation via local fallback:", err.message);
    }

    const existing = getStoredData("hp_prescriptions_api", INITIAL_PRESCRIPTIONS);
    const created = {
      id: `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0],
      doctor: "Dr. Rashi Shrivastava",
      ...prescription,
    };
    const updated = [created, ...existing];
    setStoredData("hp_prescriptions_api", updated);
    return created;
  },

  // ==========================================
  // 3. Patient Health Tracing & Case
  // ==========================================
  async fetchPatientTracing() {
    try {
      const res = await fetch(`${API_BASE_URL}/patients`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        const patientCase = Array.isArray(data.patients) ? data.patients[0] : null;
        if (patientCase) {
          setStoredData("hp_patient_tracing_api", patientCase);
          return patientCase;
        }
      }
    } catch (err) {
      console.warn("⚠️ Patient tracing offline fallback:", err.message);
    }
    return getStoredData("hp_patient_tracing_api", INITIAL_PATIENT_TRACING);
  },

  async updateSymptomSeverity({ index, severity, patientId }) {
    try {
      if (patientId) {
        const res = await fetch(`${API_BASE_URL}/patients/${patientId}/symptoms`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptomIndex: index, severity }),
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          const updated = await res.json();
          setStoredData("hp_patient_tracing_api", updated);
          return updated;
        }
      }
    } catch (err) {
      console.warn("⚠️ Update symptom via local fallback:", err.message);
    }

    const tracing = getStoredData("hp_patient_tracing_api", INITIAL_PATIENT_TRACING);
    const updatedSymptoms = [...tracing.symptomTracker];
    if (updatedSymptoms[index]) {
      updatedSymptoms[index].currentSeverity = severity;
    }

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

  // ==========================================
  // 4. Medicines Catalog
  // ==========================================
  async fetchMedicines() {
    try {
      const res = await fetch(`${API_BASE_URL}/medicines`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((m) => ({
            ...m,
            id: m._id || m.id,
          }));
          return mapped;
        }
      }
    } catch (err) {
      console.warn("⚠️ Medicines offline fallback:", err.message);
    }
    return MEDICINE_STORE_ITEMS;
  },

  // ==========================================
  // 5. Patients Directory (For Dr. Rashi's EMR / 1000+ Patients)
  // ==========================================
  async fetchPatientsDirectory(search = "", status = "All") {
    try {
      let query = `${API_BASE_URL}/patients?limit=50`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      if (status && status !== "All") query += `&status=${encodeURIComponent(status)}`;

      const res = await fetch(query, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.patients) && data.patients.length > 0) {
          const formatted = data.patients.map((p) => ({
            ...p,
            id: p._id || p.id,
          }));
          setStoredData("hp_patients_directory_api", formatted);
          return formatted;
        }
      }
    } catch (err) {
      console.warn("⚠️ Patients directory offline fallback:", err.message);
    }
    return getStoredData("hp_patients_directory_api", ALL_PATIENTS_DIRECTORY);
  },

  async updatePatientNote({ id, doctorNote }) {
    try {
      const res = await fetch(`${API_BASE_URL}/patients/${id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorNotes: doctorNote }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const updated = await res.json();
        const patients = getStoredData("hp_patients_directory_api", ALL_PATIENTS_DIRECTORY);
        const mapped = patients.map((p) =>
          p.id === id || p._id === id ? { ...p, doctorNotes: doctorNote } : p
        );
        setStoredData("hp_patients_directory_api", mapped);
        return updated;
      }
    } catch (err) {
      console.warn("⚠️ Note update via local fallback:", err.message);
    }

    const patients = getStoredData("hp_patients_directory_api", ALL_PATIENTS_DIRECTORY);
    const updated = patients.map((p) =>
      p.id === id ? { ...p, doctorNotes: doctorNote } : p
    );
    setStoredData("hp_patients_directory_api", updated);
    return { id, doctorNote };
  },

  // ==========================================
  // 6. Dispensary Orders
  // ==========================================
  async fetchDoctorOrders() {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/all`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((o) => ({
            ...o,
            id: o.orderCode || o._id,
          }));
          setStoredData("hp_orders", formatted);
          return formatted;
        }
      }
    } catch (err) {
      console.warn("⚠️ Doctor orders offline fallback:", err.message);
    }
    return getStoredData("hp_orders", INITIAL_ORDERS);
  },

  async updateOrderStatus({ id, status }) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const updatedDoc = await res.json();
        const orders = getStoredData("hp_orders", INITIAL_ORDERS);
        const mapped = orders.map((o) =>
          o.id === id || o._id === id || o.orderCode === id ? { ...o, status } : o
        );
        setStoredData("hp_orders", mapped);
        return updatedDoc;
      }
    } catch (err) {
      console.warn("⚠️ Order status update via local fallback:", err.message);
    }

    const orders = getStoredData("hp_orders", INITIAL_ORDERS);
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setStoredData("hp_orders", updated);
    return { id, status };
  },

  // ==========================================
  // 7. Consultation Room In-Call Chat API
  // ==========================================
  async fetchChatMessages(appointmentCode) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/${appointmentCode}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const messages = await res.json();
        return messages;
      }
    } catch (err) {
      console.warn("⚠️ Chat fetch offline fallback:", err.message);
    }
    return [];
  },

  async sendChatMessage(msgData) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("⚠️ Chat send offline fallback:", err.message);
    }
    return msgData;
  },
};
