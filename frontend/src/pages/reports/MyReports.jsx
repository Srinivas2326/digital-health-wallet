import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareEmail, setShareEmail] = useState({});
  const [sharing, setSharing] = useState({});

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ======================
  // DELETE REPORT
  // ======================
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete report");
    }
  };

  // ======================
  // SHARE REPORT
  // ======================
  const shareReport = async (reportId) => {
    if (!shareEmail[reportId]) {
      alert("Please enter an email");
      return;
    }

    try {
      setSharing((prev) => ({ ...prev, [reportId]: true }));

      await api.post("/share", {
        reportId,
        sharedWith: shareEmail[reportId],
      });

      alert("Report shared successfully");
      setShareEmail((prev) => ({ ...prev, [reportId]: "" }));
    } catch {
      alert("Failed to share report");
    } finally {
      setSharing((prev) => ({ ...prev, [reportId]: false }));
    }
  };

  return (
    <Layout>
      <h2 className="page-title">My Reports</h2>

      {loading ? (
        <p className="mt-20">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="mt-20">No reports uploaded yet.</p>
      ) : (
        <div className="card-grid mt-20">
          {reports.map((r) => {
            const fileUrl = `http://localhost:5000/${r.filePath.replace(
              /^\/?/,
              ""
            )}`;

            return (
              <div className="card report-card" key={r.id}>
                <h4>{r.type}</h4>
                <p>Date: {r.reportDate}</p>
                <p>Vitals: {r.vitals || "N/A"}</p>

                {/* VIEW / DOWNLOAD */}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="report-link"
                >
                  View / Download Report
                </a>

                {/* SHARE SECTION */}
                <div className="share-box">
                  <input
                    type="email"
                    placeholder="Share with email"
                    value={shareEmail[r.id] || ""}
                    onChange={(e) =>
                      setShareEmail((prev) => ({
                        ...prev,
                        [r.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => shareReport(r.id)}
                    disabled={sharing[r.id]}
                    className="share-btn"
                  >
                    {sharing[r.id] ? "Sharing..." : "Share"}
                  </button>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteReport(r.id)}
                  className="delete-btn"
                >
                  Delete Report
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
