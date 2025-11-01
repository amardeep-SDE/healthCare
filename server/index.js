// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// DB connect

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
