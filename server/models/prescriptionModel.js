// models/prescriptionModel.js
import mongoose from "mongoose";

const remedyItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  potency: { type: String, required: true, default: "200CH" },
  form: { type: String, default: "Globules / Pills (Size 30)" },
  dosage: { type: String, required: true },
  duration: { type: String, default: "15 Days" },
  instructions: { type: String },
});

const prescriptionSchema = new mongoose.Schema(
  {
    rxCode: {
      type: String,
      default: () => `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      unique: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    patientName: { type: String, required: true },
    doctor: { type: String, default: "Dr. Rashi Shrivastava (BHMS)" },
    diagnosis: { type: String, required: true },
    medicines: [remedyItemSchema],
    dietRestrictions: [{ type: String }],
    followUpDate: { type: String },
    improvementScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
