// routes/patientRoutes.js
import express from "express";
import {
  getPatientsDirectory,
  getPatientCase,
  updateDoctorNote,
  updateSymptomSeverity,
  uploadDocument,
} from "../controllers/patientCaseController.js";

const router = express.Router();

router.get("/", getPatientsDirectory);
router.get("/:id", getPatientCase);
router.patch("/:id/notes", updateDoctorNote);
router.patch("/:id/symptoms", updateSymptomSeverity);
router.post("/:id/documents", uploadDocument);

export default router;
