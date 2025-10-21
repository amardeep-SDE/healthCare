// controllers/appointmentController.js
import axios from "axios";

// 📥 Calendly Webhook handler
export const calendlyWebhook = async (req, res) => {
  try {
    const eventData = req.body;

    console.log("📩 Webhook received:", eventData);

    // yahan tum DB me save kar sakte ho appointment
    // For now just returning success
    res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// 📤 Get all appointments (for frontend)
export const getAllAppointments = async (req, res) => {
  try {
    // Later: MongoDB se appointments fetch karenge
    res.json([{ id: 1, name: "Dr. Rashi Shrivastava", time: "10:30 AM" }]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
