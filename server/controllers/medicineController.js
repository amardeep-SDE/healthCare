// controllers/medicineController.js
import Medicine from "../models/medicineModel.js";

// @desc    Get all remedies & care kits
// @route   GET /api/medicines
// @access  Public
export const getMedicines = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
      ];
    }

    const medicines = await Medicine.find(query).sort({ rating: -1 });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new remedy to dispensary
// @route   POST /api/medicines
// @access  Doctor
export const addMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const saved = await newMedicine.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
