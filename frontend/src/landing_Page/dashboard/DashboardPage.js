import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch (err) {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-topbar">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back to your account</p>
        </div>
        <div className="account-pill">
          <div className="avatar-badge">
            {(user?.fullName || user?.username || "U").charAt(0).toUpperCase()}
          </div>
          <div className="account-info">
            <span className="name">{user?.fullName || "User"}</span>
            <span className="username">@{user?.username || "username"}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-card">
        <h4>Your account is ready</h4>
        <p>
          This is your dashboard landing page. You can now continue building holdings,
          positions and profile sections from here.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
