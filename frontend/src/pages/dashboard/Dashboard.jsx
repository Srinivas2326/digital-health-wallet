import Layout from "../../components/common/Layout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Layout>
      <div className="dashboard">
        <h2 className="page-title">Dashboard</h2>

        {/* Top Stats */}
        <div className="stats-grid">
          <StatCard title="Total Reports" value="📄 12" />
          <StatCard title="Vitals Records" value="❤️ 8" />
          <StatCard title="Shared Access" value="🔗 3" />
        </div>

        {/* Quick Actions */}
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

/* ---------- Components ---------- */

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
