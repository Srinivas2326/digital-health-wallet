import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("");
  const [vitals, setVitals] = useState("");

  // Share
  const [shareEmail, setShareEmail] = useState({});
  const [success, setSuccess] = useState("");

  // ================= FETCH REPORTS =================
  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ================= APPLY FILTER =================
  const applyFilter = async () => {
    try {
      const res = await api.get("/reports/filter", {
        params: { fromDate, toDate, type, vitals },
      });
      setReports(res.data.reports || []);
    } catch {
      alert("Failed to filter reports");
    }
  };

  // ================= DELETE REPORT =================
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete report");
    }
  };

  // ================= SHARE REPORT =================
  const shareReport = async (reportId) => {
    const email = shareEmail[reportId];
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      await api.post("/share", {
        reportId,
        sharedWith: email,
      });
      setSuccess("✅ Report shared successfully");
      setShareEmail({ ...shareEmail, [reportId]: "" });
    } catch {
      alert("Failed to share report");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">My Reports</h2>

      {/* ================= FILTER SECTION ================= */}
      <div className="card mt-20">
        <h4 style={{ marginBottom: "10px" }}>Filter Reports</h4>

        <div className="filter-grid">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <input
            placeholder="Report Type (Blood, X-Ray)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            placeholder="Vitals keyword (BP, Sugar)"
            value={vitals}
            onChange={(e) => setVitals(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "10px" }} onClick={applyFilter}>
          Apply Filter
        </button>
      </div>
      {/* ================================================== */}

      {success && (
        <p style={{ color: "#16a34a", marginTop: "10px" }}>{success}</p>
      )}

      {loading ? (
        <p className="mt-20">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="mt-20">No reports found.</p>
      ) : (
        <div className="card-grid mt-20">
          {reports.map((r) => (
            <div className="card" key={r.id}>
              <h4>{r.type}</h4>
              <p>Date: {r.reportDate}</p>
              <p>Vitals: {r.vitals || "N/A"}</p>

              {/* ✅ FIXED: DIRECT CLOUDINARY URL */}
              <a
                href={r.filePath}
                target="_blank"
                rel="noreferrer"
                className="link-primary"
              >
                View / Download Report
              </a>

              {/* ================= SHARE ================= */}
              <input
                type="email"
                placeholder="Share with email"
                value={shareEmail[r.id] || ""}
                onChange={(e) =>
                  setShareEmail({
                    ...shareEmail,
                    [r.id]: e.target.value,
                  })
                }
                style={{ marginTop: "10px" }}
              />

              <button
                className="share-btn"
                onClick={() => shareReport(r.id)}
              >
                Share Report
              </button>

              {/* ================= DELETE ================= */}
              <button
                className="delete-btn"
                onClick={() => deleteReport(r.id)}
              >
                Delete Report
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
