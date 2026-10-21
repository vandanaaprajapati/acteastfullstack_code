import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import storeImage from "../../img/storeimg.png";
import { ADMIN_API_BASE_URL } from "./adminApi";
import "./AdminLogin.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = "Email is required";
    } else if (!emailPattern.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length > 72) {
      nextErrors.password = "Password must be 72 characters or fewer";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to sign in");
      }

      navigate("/admin", { replace: true });
    } catch (error) {
      setServerError(
        error.message === "Failed to fetch"
          ? "Could not reach the server. Check that the backend is running."
          : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-brand-panel">
        <img className="admin-login-brand-image" src={storeImage} alt="" />
        <div className="admin-login-image-overlay" aria-hidden="true" />
        <div className="admin-login-brand-content">
          <span className="admin-login-kicker">STORE MANAGEMENT</span>
          <h1>ActEast Store</h1>
          <p>Admin access</p>
        </div>
        <span className="admin-login-panel-foot">ACTEAST · GUWAHATI, INDIA</span>
      </section>

      <section className="admin-login-form-panel">
        <Link className="admin-login-back" to="/" target="_blank" aria-label="Back to store">
          <FiArrowLeft aria-hidden="true" />
          <span>Back to store</span>
        </Link>
        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-login-lock"><FiLock aria-hidden="true" /></div>
          <p className="admin-login-kicker">ADMIN PORTAL</p>
          <h2>Sign in</h2>
          <p className="admin-login-intro">Use your administrator email and password.</p>

          <label className="admin-login-label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className={`admin-login-input${errors.email ? " has-error" : ""}`}
            type="email"
            name="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck="false"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((current) => ({ ...current, email: "" }));
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "admin-email-error" : undefined}
            required
          />
          {errors.email && <span className="admin-field-error" id="admin-email-error">{errors.email}</span>}

          <label className="admin-login-label" htmlFor="admin-password">Password</label>
          <div className={`admin-password-wrap${errors.password ? " has-error" : ""}`}>
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: "" }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "admin-password-error" : undefined}
              required
            />
            <button
              className="admin-password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </button>
          </div>
          {errors.password && <span className="admin-field-error" id="admin-password-error">{errors.password}</span>}

          {serverError && <div className="admin-login-alert" role="alert">{serverError}</div>}

          <button className="admin-login-submit" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
          <p className="admin-login-security">Authorized administrators only</p>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
