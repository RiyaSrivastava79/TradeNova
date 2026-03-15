import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../signup/Signup.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const buildDashboardUrl = (user) => {
  if (!user) {
    return DASHBOARD_URL;
  }

  const encodedUser = encodeURIComponent(JSON.stringify(user));
  return `${DASHBOARD_URL}/?user=${encodedUser}`;
};

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  useEffect(() => {
    setInputValue({ email: "", password: "" });

    const isLogout = new URLSearchParams(window.location.search).get("logout") === "true";
    if (!isLogout) {
      return;
    }

    localStorage.removeItem("loggedInUser");
    window.history.replaceState({}, document.title, window.location.pathname);
    toast.success("Logged out successfully");
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        const user = data.user || null;
        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
        }
        window.location.href = buildDashboardUrl(user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check backend server.";
      toast.error(message);
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-shell">
        <div className="signup-visual">
          <img src="/media/images/signup.png" alt="Trading account preview" />
        </div>

        <div className="signup-form-panel">
          <h2>Login to your account</h2>
          <p className="signup-subtitle">Access your trading dashboard securely</p>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                placeholder="Enter your email address"
                pattern="^[a-zA-Z0-9._%+-]+@gmail\\.com$"
                title="Please enter a valid Gmail address (example@gmail.com)"
                autoComplete="off"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                placeholder="Enter your password"
                pattern="^(?=.*[^A-Za-z0-9]).{8,}$"
                title="Password must be at least 8 characters and include at least one special character"
                autoComplete="new-password"
                onChange={handleOnChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 signup-btn">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Signup
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
