// models/medicineModel.js
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Care Kits", "Topical Creams", "Dilutions", "Syrups & Tonics", "Clinic Supplies", "Prescription Batch"],
      required: true,
    },
    tag: { type: String },
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 50 },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 30 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
