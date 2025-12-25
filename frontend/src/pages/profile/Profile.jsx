import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================
     FETCH PROFILE
  ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile({
          name: res.data.name,
          email: res.data.email,
        });
      } catch {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  /* =========================
     UPDATE PROFILE
  ========================= */
  const updateProfile = async () => {
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await api.put("/profile", profile);
      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */
  const changePassword = async () => {
    setError("");
    setMessage("");

    try {
      setLoading(true);
      await api.put("/profile/password", passwords);
      setMessage("Password updated successfully 🔒");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* ✅ HEADING WITH USER NAME */}
      <h2 className="page-title">
        My Profile{" "}
        {profile.name && (
          <span
            style={{
              fontSize: "15px",
              color: "#60a5fa",
              fontWeight: 500,
            }}
          >
            ({profile.name})
          </span>
        )}
      </h2>

      {error && <p style={{ color: "#dc2626" }}>{error}</p>}
      {message && <p style={{ color: "#16a34a" }}>{message}</p>}

      {/* EDIT PROFILE */}
      <div className="card mt-20">
        <h3>Edit Profile</h3>

        <input
          placeholder="Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
        />

        <button onClick={updateProfile} disabled={loading}>
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

        <button onClick={changePassword} disabled={loading}>
          Change Password
        </button>
      </div>
    </Layout>
  );
}
