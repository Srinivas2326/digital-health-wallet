import { useState, useRef } from "react";
import api from "../../api/axios";
import Layout from "../../components/common/Layout";

export default function UploadReport() {
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    reportType: "",
    reportDate: "",
    vitals: "",
    report: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Frontend validation
    if (!form.reportType || !form.reportDate || !form.report) {
      setError("Report type, date, and file are required");
      return;
    }

    const formData = new FormData();
    formData.append("report", form.report); // 🔥 MUST be "report"
    formData.append("reportType", form.reportType);
    formData.append("reportDate", form.reportDate);
    formData.append("vitals", form.vitals || "");

    try {
      setLoading(true);

      await api.post("/reports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Report uploaded successfully 🎉");

      // Reset form
      setForm({
        reportType: "",
        reportDate: "",
        vitals: "",
        report: null,
      });

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
          "Failed to upload report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Upload Medical Report</h2>

      <div className="card mt-20" style={{ maxWidth: "420px" }}>
        {error && (
          <p style={{ color: "#dc2626", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "#16a34a", marginBottom: "12px" }}>
            {success}
          </p>
        )}

        <form onSubmit={submit}>
          <input
            placeholder="Report Type (Blood Test, X-Ray)"
            value={form.reportType}
            onChange={(e) =>
              setForm({ ...form, reportType: e.target.value })
            }
          />

          <input
            type="date"
            value={form.reportDate}
            onChange={(e) =>
              setForm({ ...form, reportDate: e.target.value })
            }
          />

          <input
            placeholder="Vitals (e.g. BP 120/80)"
            value={form.vitals}
            onChange={(e) =>
              setForm({ ...form, vitals: e.target.value })
            }
          />

          <input
            type="file"
            ref={fileRef}
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) =>
              setForm({ ...form, report: e.target.files[0] })
            }
          />

          <button disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Uploading..." : "Upload Report"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
