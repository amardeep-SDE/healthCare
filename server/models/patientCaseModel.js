// models/patientCaseModel.js
import mongoose from "mongoose";

const symptomTrackerSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  initialSeverity: { type: Number, required: true, default: 8 },
  currentSeverity: { type: Number, required: true, default: 4 },
  unit: { type: String, default: "/ 10" },
});

const timelineEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String },
  remedy: { type: String },
  status: { type: String, default: "Completed" },
});

const documentRecordSchema = new mongoose.Schema({
  docCode: { type: String, default: () => `DOC-${Math.floor(100 + Math.random() * 900)}` },
  title: { type: String, required: true },
  type: { type: String, default: "Lab Report (PDF)" },
  date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  fileUrl: { type: String },
  size: { type: String, default: "2.1 MB" },
  doctorNotes: { type: String },
});

const patientCaseSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    primaryCondition: { type: String, required: true },
    treatmentDuration: { type: String, default: "4 Weeks" },
    overallImprovement: { type: Number, default: 70 },
    treatmentStatus: {
      type: String,
      enum: ["Active Treatment", "Under Follow-up", "Cured / Stable", "Initial Consult"],
      default: "Active Treatment",
    },
    thermalPreference: { type: String, default: "Chilly (Sensitive to cold)" },
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    familyHistory: { type: String },
    dietHabits: { type: String },
    sleepQuality: { type: String },
    currentRemedy: { type: String },
    doctorNotes: { type: String },
    symptomTracker: [symptomTrackerSchema],
    timeline: [timelineEventSchema],
    documents: [documentRecordSchema],
  },
  { timestamps: true }
);

const PatientCase = mongoose.model("PatientCase", patientCaseSchema);
export default PatientCase;
