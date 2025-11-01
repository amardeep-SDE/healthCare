// models/appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  eventType: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
