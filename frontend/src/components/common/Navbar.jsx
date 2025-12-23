import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h3>Digital Health Wallet</h3>
        <span className="navbar-subtitle">Secure Health Records</span>
      </div>

      <div className="navbar-right" style={{ display: "flex", gap: "12px" }}>
        {/* 🌗 THEME TOGGLE */}
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* 🚪 LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
