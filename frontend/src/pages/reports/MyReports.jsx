import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ✅ DELETE REPORT HANDLER
  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Failed to delete report");
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
              <div className="card" key={r.id}>
                <h4>{r.type}</h4>
                <p>Date: {r.reportDate}</p>
                <p>Vitals: {r.vitals || "N/A"}</p>

                {/* VIEW / DOWNLOAD ONLY */}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    color: "#2563eb",
                    fontWeight: 500,
                  }}
                >
                  View / Download Report
                </a>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteReport(r.id)}
                  style={{
                    marginTop: "12px",
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                  }}
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
