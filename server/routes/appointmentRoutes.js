// routes/appointmentRoutes.js
import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/").post(bookAppointment).get(getAllAppointments);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", cancelAppointment);

export default router;
