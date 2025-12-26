import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function SharedWithMe() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedReports = async () => {
      try {
        const res = await api.get("/share/me");
        setReports(res.data.reports || []);
      } catch (err) {
        setError("Failed to load shared reports");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedReports();
  }, []);

  return (
    <Layout>
      <h2 className="page-title">Reports Shared With Me</h2>

      {/* Loading */}
      {loading && <p className="mt-20">Loading shared reports...</p>}

      {/* Error */}
      {!loading && error && (
        <p className="mt-20" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && !error && reports.length === 0 && (
        <div className="card mt-20 text-center">
          <p>No reports have been shared with you yet.</p>
        </div>
      )}

      {/* Reports Grid */}
      {!loading && !error && reports.length > 0 && (
        <div className="card-grid mt-20">
          {reports.map((r) => (
            <div className="card" key={r.id}>
              <h4 style={{ marginBottom: "6px" }}>📄 {r.type}</h4>

              <p style={{ fontSize: "14px", color: "#6b7280" }}>
                Date: {r.reportDate}
              </p>

              {r.vitals && (
                <p style={{ marginTop: "6px" }}>
                  <strong>Vitals:</strong> {r.vitals}
                </p>
              )}

              <a
                href={r.filePath}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#2563eb",
                  fontWeight: 500,
                }}
              >
                🔍 View / Download Report
              </a>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
