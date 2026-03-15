import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Signup.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

const buildDashboardUrl = (user) => {
  if (!user) {
    return DASHBOARD_URL;
  }

  const encodedUser = encodeURIComponent(JSON.stringify(user));
  return `${DASHBOARD_URL}/?user=${encodedUser}`;
};

function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
        `${API_BASE_URL}/auth/signup`,
        { email, password, username },
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
        "Signup failed. Please check backend server.";
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
          <h2>Create your account</h2>
          <p className="signup-subtitle">Start your investment journey in minutes</p>

          <form onSubmit={handleSubmit}>
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
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                className="form-control"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                pattern="^(?=.*[^A-Za-z0-9]).{8,}$"
                title="Password must be at least 8 characters and include at least one special character"
                onChange={handleOnChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 signup-btn">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;