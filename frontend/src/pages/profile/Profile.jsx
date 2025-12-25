import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/profile").then((res) => {
      setForm({
        name: res.data.name,
        email: res.data.email,
      });
    });
  }, []);

  const updateProfile = async () => {
    try {
      setError("");
      setMessage("");
      await api.put("/profile", form);
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const changePassword = async () => {
    try {
      setError("");
      setMessage("");
      await api.put("/profile/password", passwords);
      setMessage("Password updated successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">My Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* UPDATE PROFILE */}
      <div className="card">
        <h3>Edit Profile</h3>

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

        <button onClick={updateProfile}>
          Update Profile
        </button>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="card mt-20">
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              currentPassword: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              newPassword: e.target.value,
            })
          }
        />

        <button onClick={changePassword}>
          Change Password
        </button>
      </div>
    </Layout>
  );
}
