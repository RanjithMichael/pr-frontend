import React, { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const { data } = await api.post("/forgot-password", { email });
      setMsg({ type: "success", text: data?.message || "If the email exists, a reset link has been sent." });
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data?.message || "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Forgot Password</h3>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button disabled={loading} className="btn btn-primary">{loading ? "Sending..." : "Send Reset Link"}</button>
      </form>
      <p className="text-muted mt-3">
        For testing, log the token in your backend and paste it into the Reset Password page URL.
      </p>
    </div>
  );
}
