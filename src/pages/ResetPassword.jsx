import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams(); // from /reset-password/:token
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (password !== confirm) {
      setMsg({ type: "warning", text: "Passwords do not match." });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post(`/api/auth/reset-password/${token}`, { password });
      setMsg({ type: "success", text: data?.message || "Password has been reset. Please login." });
      setPassword(""); setConfirm("");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data?.message || "Reset failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Reset Password</h3>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <button disabled={loading} className="btn btn-success">{loading ? "Updating..." : "Reset Password"}</button>
      </form>
    </div>
  );
}
