import React from 'react'
import { FaHome, FaTable, FaBox, FaTruck, FaShoppingCart, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-router'
import './Sidebar.css'

const Sidebar = () => {
  const menuItems = [
      { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true},
      { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false},
      { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false},
      { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false},
      { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false},
      { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false},
      { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false},
      { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent: false},

  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Sistema ATIs</span>
        <span className="sidebar-title-short">ATIs</span>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-menu-list">
          {menuItems.map((item) => (
            <li className="sidebar-menu-item" key={item.name}>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar