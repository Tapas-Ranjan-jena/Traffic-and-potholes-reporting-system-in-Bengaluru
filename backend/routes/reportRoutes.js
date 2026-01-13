const express = require("express");
const router = express.Router();

const {
  createReport,
  getMyReports,
  getAllReports,
  getReportById,
  updateReport,
  updateReportStatus,
  deleteReport,
} = require("../controllers/reportController");

const { protect, admin } = require("../middleware/authMiddleware");

// =======================
// USER ROUTES
// =======================

// Create report
router.post("/", protect, createReport);

// Get logged-in user's reports
router.get("/my", protect, getMyReports);

// Get single report (for edit)
router.get("/:id", protect, getReportById);

// Update report (owner only)
router.put("/:id", protect, updateReport);

// Delete report (owner OR admin)
router.delete("/:id", protect, deleteReport);

// =======================
// ADMIN ROUTES
// =======================

// Get all reports
router.get("/", protect, admin, getAllReports);

// Update report status
router.put("/:id/status", protect, admin, updateReportStatus);

module.exports = router;
