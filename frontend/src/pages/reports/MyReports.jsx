import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchReports();
  }, []);

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
            // ✅ FIXED FILE URL
            const fileUrl = `http://localhost:5000/${r.filePath.replace(
              /^\/?/,
              ""
            )}`;

            return (
              <div className="card" key={r.id}>
                <h4>{r.type}</h4>
                <p>Date: {r.reportDate}</p>
                <p>Vitals: {r.vitals || "N/A"}</p>

                {/* Image preview (if image) */}
                {r.filePath.match(/\.(jpg|jpeg|png)$/i) && (
                  <img
                    src={fileUrl}
                    alt="Medical Report"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}

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
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
