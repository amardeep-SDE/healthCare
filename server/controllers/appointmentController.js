// controllers/appointmentController.js
import Appointment from "../models/appointmentModel.js";

export const calendlyWebhook = async (req, res) => {
  try {
    const payload = req.body;

    console.log("📩 Calendly Webhook Data:", payload);

    // Example: Calendly webhook structure parsing
    const event = payload?.payload?.event;
    const invitee = payload?.payload?.invitee;

    const appointment = new Appointment({
      name: invitee?.name,
      email: invitee?.email,
      eventType: event?.event_type_name,
      startTime: event?.start_time,
      endTime: event?.end_time,
    });

    await appointment.save();

    res.status(200).json({ message: "✅ Appointment saved successfully" });
  } catch (error) {
    console.error("❌ Webhook save error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
