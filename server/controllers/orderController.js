// controllers/orderController.js
import Order from "../models/orderModel.js";

// @desc    Place a new dispensary order
// @route   POST /api/orders
// @access  Public / Patient
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    const orderCode = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingId = `DRR-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const newOrder = new Order({
      orderCode,
      patient: req.user?._id || null,
      items,
      totalAmount,
      shippingFee: 0,
      paymentMethod: paymentMethod || "UPI",
      paymentStatus: "Paid",
      status: "Dispensed",
      trackingId,
      deliveryAddress,
      estimatedDelivery,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient orders
// @route   GET /api/orders/my-orders
// @access  Private / Patient
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders for Dr. Rashi (Super Admin)
// @route   GET /api/orders/all
// @access  Doctor
export const getAllOrdersForDoctor = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order fulfillment status (Dispensed -> In Transit -> Delivered)
// @route   PATCH /api/orders/:id/status
// @access  Doctor
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      const byCode = await Order.findOneAndUpdate(
        { orderCode: req.params.id },
        { status },
        { new: true }
      );
      if (!byCode) return res.status(404).json({ message: "Order not found" });
      return res.json(byCode);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
