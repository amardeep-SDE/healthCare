// routes/appointmentRoutes.js
import express from "express";
import { calendlyWebhook, getAllAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

// Webhook endpoint (Calendly will send data here)
router.post("/webhook", calendlyWebhook);

// Get all booked appointments (for frontend UI)
router.get("/", getAllAppointments);

export default router;
