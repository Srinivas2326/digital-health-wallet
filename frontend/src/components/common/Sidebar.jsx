import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🩺 Health Wallet</h2>
        <p className="subtitle">Digital Health</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          ⬆️ Upload Report
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          📄 My Reports
        </NavLink>

        <NavLink
          to="/vitals"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          ❤️ Vitals
        </NavLink>

        <NavLink
          to="/shared"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          🔗 Shared With Me
        </NavLink>
      </nav>
    </aside>
  );
}
