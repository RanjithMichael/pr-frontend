import React, { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await api.post("/api/auth/register", form);
      setMsg({ type: "success", text: "Registered successfully. You can log in now." });
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Register</h3>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={onChange} required />
        </div>
        <button disabled={loading} className="btn btn-primary">{loading ? "Please wait..." : "Create account"}</button>
      </form>
    </div>
  );
}
