import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* =========================
   DATE FORMAT FIX (IMPORTANT)
========================= */
const parseSQLiteDate = (dateStr) => {
  // Convert: "YYYY-MM-DD HH:mm:ss" → valid JS date
  return new Date(dateStr.replace(" ", "T"));
};

export default function MyVitals() {
  const [vitals, setVitals] = useState([]);
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     FETCH VITALS
  ========================= */
  const fetchVitals = async () => {
    try {
      const res = await api.get("/vitals");
      setVitals(res.data.vitals || []);
    } catch {
      setError("Failed to load vitals");
    }
  };

  /* =========================
     ADD VITAL
  ========================= */
  const addVital = async () => {
    setError("");
    setSuccess("");

    if (!type || !value) {
      setError("Vital type and value are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/vitals", {
        vitalType: type,
        value,
      });

      setSuccess("Vital added successfully ❤️");
      setType("");
      setValue("");
      fetchVitals();
    } catch {
      setError("Failed to add vital");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  /* =========================
     BUILD CHART DATA
  ========================= */
  const buildChartData = (vitalType) => {
    // Filter + validate numeric values
    const filtered = vitals
      .filter(
        (v) =>
          v.vitalType.toLowerCase() === vitalType.toLowerCase() &&
          !isNaN(parseFloat(v.value))
      )
      // SORT BY DATE (CRITICAL)
      .sort(
        (a, b) =>
          parseSQLiteDate(a.recordedAt) -
          parseSQLiteDate(b.recordedAt)
      );

    return {
      labels: filtered.map((v) =>
        parseSQLiteDate(v.recordedAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      ),
      datasets: [
        {
          label: vitalType,
          data: filtered.map((v) => parseFloat(v.value)),
          borderColor:
            vitalType.toLowerCase() === "bp" ? "#ef4444" : "#2563eb",
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.4,
          pointRadius: 4,
        },
      ],
    };
  };

  return (
    <Layout>
      <h2 className="page-title">My Vitals</h2>

      {/* ADD VITAL */}
      <div className="card mt-20" style={{ maxWidth: "420px" }}>
        {error && (
          <p style={{ color: "#dc2626", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "#16a34a", marginBottom: "10px" }}>
            {success}
          </p>
        )}

        <input
          placeholder="Vital Type (BP, Sugar)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          placeholder="Value (120, 95)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={addVital} disabled={loading}>
          {loading ? "Saving..." : "Add Vital"}
        </button>
      </div>

      {/* VITALS LIST */}
      <div className="card-grid mt-20">
        {vitals.length === 0 ? (
          <p>No vitals recorded yet.</p>
        ) : (
          vitals.map((v) => (
            <div className="card" key={v.id}>
              <h4 style={{ marginBottom: "6px" }}>
                ❤️ {v.vitalType}
              </h4>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                {v.value}
              </p>
              <p style={{ fontSize: "12px", color: "#6b7280" }}>
                {parseSQLiteDate(v.recordedAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* CHARTS */}
      <div className="card-grid mt-20">
        <div className="card">
          <h4>Blood Pressure Trend</h4>
          <Line data={buildChartData("BP")} />
        </div>

        <div className="card">
          <h4>Sugar Level Trend</h4>
          <Line data={buildChartData("Sugar")} />
        </div>
      </div>
    </Layout>
  );
}
