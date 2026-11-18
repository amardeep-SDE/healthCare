// routes/orderRoutes.js
import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrdersForDoctor,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(placeOrder).get(getMyOrders);
router.get("/all", getAllOrdersForDoctor);
router.patch("/:id/status", updateOrderStatus);

export default router;
