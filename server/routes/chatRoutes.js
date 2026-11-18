// routes/chatRoutes.js
import express from "express";
import {
  getMessagesByAppointment,
  saveMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/:appointmentCode", getMessagesByAppointment);
router.post("/", saveMessage);

export default router;
