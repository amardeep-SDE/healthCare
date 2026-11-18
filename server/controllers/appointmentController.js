// controllers/appointmentController.js
import Appointment from "../models/appointmentModel.js";

// @desc    Book a new consultation (Online or In-Clinic)
// @route   POST /api/appointments
// @access  Public
export const bookAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientPhone,
      patientEmail,
      patientAge,
      patientGender,
      date,
      timeSlot,
      mode,
      concern,
      symptoms,
      fee,
      paymentMethod,
    } = req.body;

    const appointmentCode = `DRR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = new Appointment({
      appointmentCode,
      patient: req.user?._id || null,
      patientName,
      patientPhone,
      patientEmail,
      patientAge: Number(patientAge) || 26,
      patientGender: patientGender || "Female",
      date,
      timeSlot,
      mode: mode || "Online Video",
      concern,
      symptoms,
      fee: fee || 500,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod: paymentMethod || "UPI",
      meetingLink: mode?.includes("Online")
        ? `https://meet.google.com/hpc-${Math.random().toString(36).substring(2, 7)}`
        : null,
      prescriptionGiven: false,
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all appointments (For patient or clinic)
// @route   GET /api/appointments
// @access  Public
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status (e.g. Mark Completed / Attending)
// @route   PATCH /api/appointments/:id/status
// @access  Public / Doctor
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      // Also support lookup by appointmentCode
      const byCode = await Appointment.findOneAndUpdate(
        { appointmentCode: id },
        { status },
        { new: true }
      );
      if (!byCode) return res.status(404).json({ message: "Appointment not found" });
      return res.json(byCode);
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Public / Patient
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      const byCode = await Appointment.findOneAndUpdate(
        { appointmentCode: id },
        { status: "Cancelled" },
        { new: true }
      );
      if (!byCode) return res.status(404).json({ message: "Appointment not found" });
      return res.json(byCode);
    }

    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
