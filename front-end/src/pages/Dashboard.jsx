import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'

/**
 * @file Dashboard.js
 * @description This file contains the main Dashboard layout component.
 */

/**
 * Renders the main Dashboard layout.
 *
 * This component sets up the overall structure for the application's admin dashboard.
 * It includes a fixed `Sidebar` for navigation and a main content area where
 * nested routes are rendered using the `Outlet` component from `react-router-dom`.
 *
 * The layout uses Tailwind CSS classes for styling, creating a responsive
 * structure with the sidebar on the left and a main content area that
 * adjusts its margin to accommodate the sidebar's width.
 *
 * @returns {JSX.Element} The Dashboard layout component.
 */
const Dashboard = () => {
  return (
    <div>
      <div className='flex'>
         {/* The Sidebar component provides the main navigation menu */}
        <Sidebar />

        {/* The main content area.
          
          - `flex-1`: Allows this div to grow and take up the remaining space.
          - `ml-16 md:ml-64`: Sets a left margin to account for the sidebar's width,
            with a responsive adjustment for larger screens.
          - `min-h-screen`: Ensures the content area has a minimum height of the full screen.
        */}
        <div className='flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen'>
          {/* The Outlet component renders the nested routes.
            For example, it will render the components for /admin-dashboard/products,
            /admin-dashboard/users, etc., inside this container.
          */}
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard