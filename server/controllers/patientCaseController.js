// controllers/patientCaseController.js
import PatientCase from "../models/patientCaseModel.js";

// @desc    Get all patients in directory (Supports 1000s of records with search & filter)
// @route   GET /api/patients
// @access  Doctor
export const getPatientsDirectory = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.treatmentStatus = status;
    }

    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: "i" } },
        { patientPhone: { $regex: search, $options: "i" } },
        { primaryCondition: { $regex: search, $options: "i" } },
      ];
    }

    const patients = await PatientCase.find(query)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await PatientCase.countDocuments(query);

    res.json({
      patients,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalPatients: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient case history by ID
// @route   GET /api/patients/:id
// @access  Public / Doctor
export const getPatientCase = async (req, res) => {
  try {
    const patientCase = await PatientCase.findById(req.params.id);
    if (!patientCase) {
      return res.status(404).json({ message: "Patient case file not found" });
    }
    res.json(patientCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update doctor clinical notes
// @route   PATCH /api/patients/:id/notes
// @access  Doctor
export const updateDoctorNote = async (req, res) => {
  try {
    const { doctorNotes } = req.body;
    const patientCase = await PatientCase.findByIdAndUpdate(
      req.params.id,
      { doctorNotes },
      { new: true }
    );
    if (!patientCase) {
      return res.status(404).json({ message: "Patient case file not found" });
    }
    res.json(patientCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update symptom severity & recalculate recovery rate
// @route   PATCH /api/patients/:id/symptoms
// @access  Public / Patient
export const updateSymptomSeverity = async (req, res) => {
  try {
    const { symptomIndex, severity } = req.body;
    const patientCase = await PatientCase.findById(req.params.id);

    if (!patientCase) {
      return res.status(404).json({ message: "Patient case file not found" });
    }

    if (patientCase.symptomTracker[symptomIndex]) {
      patientCase.symptomTracker[symptomIndex].currentSeverity = severity;

      // Recalculate overall improvement %
      const totalInitial = patientCase.symptomTracker.reduce((sum, s) => sum + s.initialSeverity, 0);
      const totalCurrent = patientCase.symptomTracker.reduce((sum, s) => sum + s.currentSeverity, 0);
      const improvement = Math.round(((totalInitial - totalCurrent) / totalInitial) * 100);

      patientCase.overallImprovement = Math.max(0, Math.min(100, improvement));
      await patientCase.save();
    }

    res.json(patientCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload document to Health Locker
// @route   POST /api/patients/:id/documents
// @access  Patient / Doctor
export const uploadDocument = async (req, res) => {
  try {
    const { title, type, fileUrl, doctorNotes } = req.body;
    const patientCase = await PatientCase.findById(req.params.id);

    if (!patientCase) {
      return res.status(404).json({ message: "Patient case file not found" });
    }

    patientCase.documents.unshift({
      title,
      type: type || "Lab Report (PDF)",
      fileUrl,
      doctorNotes,
      date: new Date().toISOString().split("T")[0],
    });

    await patientCase.save();
    res.status(201).json(patientCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
