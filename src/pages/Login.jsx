import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    if (!form.email || !form.password) {
    setMsg({ type: "danger", text: "Please enter both email and password." });
    setLoading(false);
    return;
  }
  try {
      const { data } = await api.post("/login", form);
      const token = data?.token || data?.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        onLogin?.(token);
        navigate("/dashboard");
      } else {
        setMsg({ type: "danger", text: "No token returned from server." });
      }
    } catch (err) {
      setMsg({ type: "danger", text: err?.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Login</h3>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={onChange} required />
        </div>
        <button disabled={loading} className="btn btn-primary me-2">{loading ? "Please wait..." : "Login"}</button>
        <Link to="/forgot-password" className="btn btn-link">Forgot password?</Link>
      </form>
    </div>
  );
}