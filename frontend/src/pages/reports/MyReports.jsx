import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("");
  const [vitals, setVitals] = useState("");

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports || []);
    } catch {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // APPLY FILTER
  const applyFilter = async () => {
    setLoading(true);

    try {
      const res = await api.get("/reports/filter", {
        params: {
          fromDate,
          toDate,
          type,
          vitals,
        },
      });

      setReports(res.data.reports || []);
    } catch {
      alert("Failed to filter reports");
    } finally {
      setLoading(false);
    }
  };

  // DELETE REPORT
  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete report");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">My Reports</h2>

      {/* FILTER SECTION */}
      <div className="card mt-20">
        <h4>Filter Reports</h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginTop: "12px",
          }}
        >
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

        <button onClick={applyFilter} style={{ marginTop: "12px" }}>
          Apply Filter
        </button>
      </div>

      {/* REPORTS LIST */}
      {loading ? (
        <p className="mt-20">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="mt-20">No reports found.</p>
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

                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb", fontWeight: 500 }}
                >
                  View / Download Report
                </a>

                <button
                  className="delete-btn"
                  onClick={() => deleteReport(r.id)}
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
