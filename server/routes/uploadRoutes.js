// routes/uploadRoutes.js
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// @desc    Upload single medical report or skin photo
// @route   POST /api/upload
// @access  Public / Patient / Doctor
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded." });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      fileUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload multiple reports (up to 5)
// @route   POST /api/upload/multiple
// @access  Public / Patient
router.post("/multiple", upload.array("files", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      fileUrl: `/uploads/${file.filename}`,
    }));

    res.status(201).json({
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
