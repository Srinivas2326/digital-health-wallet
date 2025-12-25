import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email regex (same logic as backend)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = form;

    // ================= FRONTEND VALIDATION =================
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.toLowerCase(),
        password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Register</h2>

        {error && (
          <p style={{ color: "#dc2626", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
