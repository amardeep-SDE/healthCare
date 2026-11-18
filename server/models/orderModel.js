// models/orderModel.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      default: () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "UPI" },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
      default: "Paid",
    },
    status: {
      type: String,
      enum: ["Order Placed", "Dispensed", "In Transit", "Delivered", "Cancelled"],
      default: "Dispensed",
    },
    trackingId: {
      type: String,
      default: () => `DRR-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    deliveryAddress: { type: String, required: true },
    estimatedDelivery: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
