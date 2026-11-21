// server/index.js
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
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
import uploadRoutes from "./routes/uploadRoutes.js";

// Load Environment Variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve uploaded medical reports & photos statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api/upload", uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🌿 Dr. Rashi Homeo Clinic Backend Server Started`);
  console.log(`🚀 Port: http://localhost:${PORT}`);
  console.log(`📡 Socket.io: Initialized for Live Video & Real-time Chat`);
  console.log(`📄 PDF Generator: Ready at /api/prescriptions/:id/pdf`);
  console.log(`📁 File Uploads: Ready at /api/upload & /uploads`);
  console.log(`======================================================\n`);
  await connectDB();
});
