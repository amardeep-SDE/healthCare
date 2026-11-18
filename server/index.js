// server/index.js
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { setupConsultationSocket } from "./sockets/consultationSocket.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Load Environment Variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS for Tele-Consultation Room
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const io = new Server(server, {
  cors: {
    origin: [clientUrl, "http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// Attach Socket Handlers for Tele-Consultation (WebRTC & In-Call Chat)
setupConsultationSocket(io);

// Middleware
app.use(
  cors({
    origin: [clientUrl, "http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "Healthy",
    doctor: "Dr. Rashi Shrivastava (BHMS)",
    clinic: "Homeopathic Healing & Tele-Consultation Center",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🌿 Dr. Rashi Homeo Clinic Backend Server Started`);
  console.log(`🚀 Port: http://localhost:${PORT}`);
  console.log(`📡 Socket.io: Initialized for Live Video & Real-time Chat`);
  console.log(`======================================================\n`);
  await connectDB();
});
