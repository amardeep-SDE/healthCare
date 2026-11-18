// models/messageModel.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    appointmentCode: { type: String, required: true },
    sender: { type: String, required: true },
    senderRole: { type: String, enum: ["patient", "doctor"], default: "patient" },
    text: { type: String, required: true },
    attachment: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
