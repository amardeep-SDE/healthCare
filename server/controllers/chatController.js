// controllers/chatController.js
import Message from "../models/messageModel.js";

// @desc    Get chat history for a consultation
// @route   GET /api/chat/:appointmentCode
// @access  Public
export const getMessagesByAppointment = async (req, res) => {
  try {
    const messages = await Message.find({
      appointmentCode: req.params.appointmentCode,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a chat message
// @route   POST /api/chat
// @access  Public
export const saveMessage = async (req, res) => {
  try {
    const { appointmentCode, sender, senderRole, text, attachment } = req.body;

    const message = new Message({
      appointmentCode,
      sender,
      senderRole: senderRole || "patient",
      text,
      attachment,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    const saved = await message.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
