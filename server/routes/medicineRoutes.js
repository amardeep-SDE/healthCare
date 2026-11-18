// routes/medicineRoutes.js
import express from "express";
import { getMedicines, addMedicine } from "../controllers/medicineController.js";

const router = express.Router();

router.route("/").get(getMedicines).post(addMedicine);

export default router;
