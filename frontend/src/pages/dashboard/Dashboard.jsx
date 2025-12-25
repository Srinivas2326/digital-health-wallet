import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalReports: 0,
    totalVitals: 0,
    sharedAccess: 0,
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD STATS =================
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <h2 className="page-title">Dashboard</h2>

        {/* ================= TOP STATS ================= */}
        <div className="stats-grid">
          <StatCard
            title="Total Reports"
            value={loading ? "…" : `📄 ${stats.totalReports}`}
          />
          <StatCard
            title="Vitals Records"
            value={loading ? "…" : `❤️ ${stats.totalVitals}`}
          />
          <StatCard
            title="Shared Access"
            value={loading ? "…" : `🔗 ${stats.sharedAccess}`}
          />
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <h3 className="section-title">Quick Actions</h3>

        <div className="action-grid">
          <ActionCard
            title="Upload Report"
            desc="Add new medical reports"
            icon="⬆️"
            link="/upload"
          />
          <ActionCard
            title="View Reports"
            desc="See all your reports"
            icon="📄"
            link="/reports"
          />
          <ActionCard
            title="Track Vitals"
            desc="Monitor health vitals"
            icon="❤️"
            link="/vitals"
          />
          <ActionCard
            title="Shared With Me"
            desc="Access shared reports"
            icon="🔗"
            link="/shared"
          />
        </div>
      </div>
    </Layout>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}

function ActionCard({ title, desc, icon, link }) {
  return (
    <Link to={link} className="action-card">
      <div className="action-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </Link>
  );
}
