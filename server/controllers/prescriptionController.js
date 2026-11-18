// controllers/prescriptionController.js
import Prescription from "../models/prescriptionModel.js";
import Appointment from "../models/appointmentModel.js";

// @desc    Issue a digital prescription
// @route   POST /api/prescriptions
// @access  Doctor
export const issuePrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      patientName,
      diagnosis,
      medicines,
      dietRestrictions,
      followUpDate,
    } = req.body;

    const rxCode = `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newPrescription = new Prescription({
      rxCode,
      patientName: patientName || "Patient",
      doctor: "Dr. Rashi Shrivastava (BHMS)",
      diagnosis,
      medicines,
      dietRestrictions,
      followUpDate,
    });

    const saved = await newPrescription.save();

    // Mark appointment as prescription given
    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, { prescriptionGiven: true });
      await Appointment.findOneAndUpdate({ appointmentCode: appointmentId }, { prescriptionGiven: true });
    }

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Public / Patient
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Public
export const getPrescriptionById = async (req, res) => {
  try {
    const rx = await Prescription.findById(req.params.id);
    if (!rx) {
      const byCode = await Prescription.findOne({ rxCode: req.params.id });
      if (!byCode) return res.status(404).json({ message: "Prescription not found" });
      return res.json(byCode);
    }
    res.json(rx);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
