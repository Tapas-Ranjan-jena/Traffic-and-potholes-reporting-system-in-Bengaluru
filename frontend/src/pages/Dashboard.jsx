import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import ReportPreviewMap from "../components/ReportPreviewMap";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports/my");
        setReports(res.data.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      alert("Failed to delete report");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📋 My Reports</h2>
        <Link to="/create-report" className="btn btn-primary">
          + Create Report
        </Link>
      </div>

      {reports.length === 0 ? (
        <p className="text-muted">No reports submitted yet</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            className="card mb-4 shadow-sm"
            style={{ background: "var(--card-bg)" }}
          >
            <div className="row g-0">
              {/* LEFT: REPORT INFO */}
              <div className="col-md-7 p-3">
                <h5 className="card-title">{report.title}</h5>
                <p className="card-text">{report.description}</p>

                {report.location?.area && (
                  <p className="text-muted small mb-1">
                    📍 {report.location.area}
                  </p>
                )}

                <div className="mt-2">
                  <span
                    className={`badge me-2 ${
                      report.status === "resolved"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {report.status}
                  </span>

                  <span className="badge bg-info text-dark me-2">
                    {report.type}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-3">
                  <Link
                    to={`/edit-report/${report._id}`}
                    className="btn btn-sm btn-outline-secondary me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteReport(report._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* RIGHT: MAP PREVIEW */}
              <div className="col-md-5 p-3">
                <ReportPreviewMap
                  latitude={report.location?.latitude}
                  longitude={report.location?.longitude}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
