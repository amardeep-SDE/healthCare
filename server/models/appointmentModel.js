// models/appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentCode: {
      type: String,
      default: () => `DRR-${Math.floor(1000 + Math.random() * 9000)}`,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String },
    patientAge: { type: Number },
    patientGender: { type: String },
    date: { type: String, required: true }, // YYYY-MM-DD
    timeSlot: { type: String, required: true }, // e.g. "11:30 AM"
    mode: {
      type: String,
      enum: ["Online Video", "In-Clinic Visit"],
      default: "Online Video",
    },
    concern: { type: String, required: true },
    symptoms: { type: String },
    fee: { type: Number, default: 200 },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Delivered", "Cancelled"],
      default: "Confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
      default: "Paid",
    },
    paymentMethod: { type: String, default: "UPI" },
    meetingLink: { type: String },
    prescriptionGiven: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
