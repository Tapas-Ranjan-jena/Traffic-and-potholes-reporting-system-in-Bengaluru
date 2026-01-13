const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");

// --------------------
// CREATE REPORT
// --------------------
const createReport = asyncHandler(async (req, res) => {
  const { title, description, type, location } = req.body;

  if (!title || !description || !type || !location) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const report = await Report.create({
    title,
    description,
    type,
    location,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Report created successfully",
    data: report,
  });
});

// --------------------
// GET MY REPORTS (USER)
// --------------------
const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ createdBy: req.user.id })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: reports.length,
    data: reports,
  });
});

// --------------------
// GET ALL REPORTS (ADMIN)
// --------------------
const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: reports.length,
    data: reports,
  });
});

// --------------------
// GET SINGLE REPORT (EDIT PREFILL)
// --------------------
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // Owner or admin only
  if (
    report.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.json({
    success: true,
    data: report,
  });
});

// --------------------
// UPDATE REPORT (USER)
// --------------------
const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // Only owner can edit
  if (report.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to edit this report");
  }

  report.title = req.body.title || report.title;
  report.description = req.body.description || report.description;
  report.type = req.body.type || report.type;
  report.location = req.body.location || report.location;

  const updatedReport = await report.save();

  res.json({
    success: true,
    message: "Report updated successfully",
    data: updatedReport,
  });
});

// --------------------
// UPDATE REPORT STATUS (ADMIN)
// --------------------
const updateReportStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  report.status = status;
  await report.save();

  res.json({
    success: true,
    message: "Report status updated",
    data: report,
  });
});

// --------------------
// DELETE REPORT (USER / ADMIN)
// --------------------
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  if (
    report.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this report");
  }

  await report.deleteOne();

  res.json({
    success: true,
    message: "Report deleted successfully",
  });
});

module.exports = {
  createReport,
  getMyReports,
  getAllReports,
  getReportById,      // ✅ NEW
  updateReport,       // ✅ NEW
  updateReportStatus,
  deleteReport,
}; 