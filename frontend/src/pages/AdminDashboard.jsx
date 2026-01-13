import { useEffect, useState } from "react";
import API from "../api/axios";
import ReportsMap from "../components/ReportsMap";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 🔥 NEW

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await API.get("/reports");
      setReports(res.data.data);
    } catch (err) {
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id) => {
    await API.put(`/reports/${id}/status`, { status: "resolved" });
    fetchReports();
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirmDelete) return;

    await API.delete(`/reports/${id}`);
    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <div className="container mt-4">Loading reports...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  // 🔍 FILTER LOGIC
  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((r) => r.status === filter);

  const total = reports.length;
  const resolved = reports.filter((r) => r.status === "resolved").length;
  const pending = reports.filter((r) => r.status === "pending").length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛠️ Admin Dashboard</h2>

      {/* 📊 STATS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total</h6>
              <h3>{total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Pending</h6>
              <h3 className="text-warning">{pending}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Resolved</h6>
              <h3 className="text-success">{resolved}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 🗺️ MAP (ADMIN ONLY) */}
      {user?.role === "admin" && (
        <>
          <ReportsMap reports={filteredReports} />
          <hr className="my-4" />
        </>
      )}

      {/* 🔘 FILTER BUTTONS */}
      <div className="d-flex justify-content-center mb-3 gap-2">
        <button
          className={`btn btn-sm ${
            filter === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`btn btn-sm ${
            filter === "pending" ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>

        <button
          className={`btn btn-sm ${
            filter === "resolved" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setFilter("resolved")}
        >
          Resolved
        </button>
      </div>

      {/* 📋 TABLE */}
      <div className="table-responsive shadow-sm">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>User</th>
              <th>Status</th>
              <th style={{ width: "230px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No reports found
                </td>
              </tr>
            ) : (
              filteredReports.map((r) => (
                <tr key={r._id}>
                  <td>
                    <strong>{r.title}</strong>
                    <div className="text-muted small">
                      {r.location?.area}
                    </div>
                  </td>

                  <td className="text-capitalize">{r.type}</td>

                  <td>{r.createdBy?.email}</td>

                  <td>
                    <span
                      className={`badge ${
                        r.status === "resolved"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      disabled={r.status === "resolved"}
                      onClick={() => updateStatus(r._id)}
                    >
                      Resolve
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteReport(r._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
