
import React from 'react';
import { FaHome, FaTable, FaBox, FaTruck, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

/**
 * @file Sidebar.js
 * @description This file contains the Sidebar component, which serves as the main navigation for the application's admin dashboard.
 */

/**
 * Renders the main sidebar navigation component.
 *
 * This component displays a list of navigation links with icons and labels.
 * It's designed to be a fixed-position menu that expands on larger screens.
 * The navigation items are defined in the `menuItems` array.
 *
 * @returns {JSX.Element} The Sidebar component.
 */
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  /**
   * Defines the configuration for each menu item in the sidebar.
   *
   * @type {Array<Object>}
   * @property {string} name - The display name for the menu item.
   * @property {string} path - The URL path for the link.
   * @property {JSX.Element} icon - The React-icon component to display.
   * @property {boolean} isParent - Indicates if the path should be an exact match for the active link.
   */
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true },
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false },
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false },
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false },
    { name: "Logout", path: "/logout-action", icon: <FaSignOutAlt />, isParent: false, action: true },
  ];

  return (
    <div className="sidebar">
      {/* Sidebar header containing the main and short titles */}
      <div className="sidebar-header">
        <span className="sidebar-title">Sistema ATIs</span>
        <span className="sidebar-title-short">ATIs</span>
      </div>
      {/* Container for the navigation menu */}
      <div className="sidebar-menu">
        <ul className="sidebar-menu-list">
           {/* Dynamically map over menuItems to render each navigation link */}
          {menuItems.map((item) => (
            <li className="sidebar-menu-item" key={item.name}>
              {item.action ? (
                <button
                  className="sidebar-link"
                  style={{ background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  end={item.isParent}
                  className={({ isActive }) =>
                    `sidebar-link${isActive ? ' active' : ''}`
                  }
                  to={item.path}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar