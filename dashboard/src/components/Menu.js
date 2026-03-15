import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

const DASHBOARD_USER_KEY = "loggedInUser";
const FRONTEND_LOGIN_URL =
  process.env.REACT_APP_FRONTEND_LOGIN_URL || "http://localhost:3000/";

const getUserFromStorage = () => {
  try {
    const rawUser = localStorage.getItem(DASHBOARD_USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

const getUserFromQuery = () => {
  try {
    const encodedUser = new URLSearchParams(window.location.search).get("user");
    if (!encodedUser) {
      return null;
    }
    return JSON.parse(decodeURIComponent(encodedUser));
  } catch (error) {
    return null;
  }
};

const getAvatarText = (displayName) => {
  if (!displayName) {
    return "U";
  }

  const normalized = displayName.trim();
  if (!normalized) {
    return "U";
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return normalized.slice(0, 2).toUpperCase();
};

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(getUserFromStorage);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem(DASHBOARD_USER_KEY);
    setLoggedInUser(null);
    setIsProfileDropdownOpen(false);
    window.location.href = FRONTEND_LOGIN_URL;
  };

  useEffect(() => {
    const queryUser = getUserFromQuery();
    if (!queryUser) {
      return;
    }

    localStorage.setItem(DASHBOARD_USER_KEY, JSON.stringify(queryUser));
    setLoggedInUser(queryUser);
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }, []);

  const displayName = loggedInUser?.username || loggedInUser?.email || "USERID";
  const avatarText = useMemo(() => getAvatarText(displayName), [displayName]);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/tradenova-logo.svg" alt="TradeNova logo" className="dashboard-brand" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-wrapper">
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{avatarText}</div>
            <p className="username">{displayName}</p>
          </div>
          {isProfileDropdownOpen ? (
            <div className="profile-dropdown">
              <p className="profile-dropdown-label">Signed in as</p>
              <p className="profile-dropdown-value">{displayName}</p>
              <button className="profile-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Menu;