import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <h3>Digital Health Wallet</h3>
        <span className="navbar-subtitle">
          Secure Health Records
        </span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* PROFILE LINK */}
        <Link to="/profile" className="nav-link">
          👤 Profile
        </Link>

        {/* THEME TOGGLE */}
        <button
          className="theme-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* LOGOUT */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
