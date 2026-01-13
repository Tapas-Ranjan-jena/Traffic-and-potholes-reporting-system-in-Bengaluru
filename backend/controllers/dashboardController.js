const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");

// --------------------
// GET DASHBOARD STATS
// --------------------
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalReports = await Report.countDocuments();

  const pendingReports = await Report.countDocuments({ status: "pending" });
  const resolvedReports = await Report.countDocuments({ status: "resolved" });

  const trafficReports = await Report.countDocuments({ type: "traffic" });
  const potholeReports = await Report.countDocuments({ type: "pothole" });

  res.json({
    success: true,
    data: {
      totalReports,
      status: {
        pending: pendingReports,
        resolved: resolvedReports,
      },
      type: {
        traffic: trafficReports,
        pothole: potholeReports,
      },
    },
  });
});

module.exports = { getDashboardStats };
