// routes/prescriptionRoutes.js
import express from "express";
import {
  issuePrescription,
  getAllPrescriptions,
  getPrescriptionById,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.route("/").post(issuePrescription).get(getAllPrescriptions);
router.get("/:id", getPrescriptionById);

export default router;
