import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ token, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light rounded mb-4 px-3">
      <Link className="navbar-brand fw-semibold" to="/">Password Reset</Link>
      <div className="ms-auto d-flex gap-2">
        {!token ? (
          <>
            <Link className="btn btn-outline-primary btn-sm" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link className="btn btn-success btn-sm" to="/dashboard">Dashboard</Link>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => { onLogout?.(); navigate("/login"); }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
