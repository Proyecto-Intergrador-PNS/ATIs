import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Root from './utils/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';

/**
 * @file App.jsx
 * @description The main component of the application, responsible for setting up the routing structure.
 * It defines all the routes, including public, protected, and nested routes.
 */

/**
 * The main App component.
 *
 * This component uses `react-router-dom` to manage the application's navigation.
 * It wraps the entire application in a `<Router>` and defines the various paths
 * and their corresponding components within `<Routes>`.
 *
 * The routing is structured as follows:
 * - The root path (`/`) uses the `Root` component to handle initial redirection.
 * - The admin dashboard (`/admin-dashboard`) is a protected route that requires the user to have an 'admin' role.
 * - The login path (`/login`) is a public route for user authentication.
 * - Other routes are defined for different dashboards and an unauthorized access page.
 *
 * @returns {JSX.Element} The main App component with the router setup.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* The root route. The Root component handles initial routing based on user status and role. */}
        <Route path="/" element={<Root />} />

        {/* Protected route for the admin dashboard. 
            The `ProtectedRoutes` component ensures only users with the "admin" role can access it.
            The `Dashboard` component acts as a layout for all nested routes below. */}
        <Route path="/admin-dashboard" element={<ProtectedRoutes requireRole={["admin"]}> <Dashboard /> </ProtectedRoutes>}>
          {/* Index route for the dashboard. Renders when the path is exactly "/admin-dashboard". */}
          <Route index element={<h1>Summary of Dashboard</h1>} />

          {/* Nested routes for the dashboard. These pages will be rendered inside the `Outlet` 
              within the `Dashboard` component. */}
          <Route path='categories' element={<Categories />} />
          <Route path='products' element={<h1>Products</h1>} />
          <Route path='suppliers' element={<h1>Suppliers</h1>} />
          <Route path='orders' element={<h1>Orders</h1>} />
          <Route path='users' element={<h1>Users</h1>} />
          <Route path='profile' element={<h1>Profile</h1>} />
          <Route path='logout' element={<h1>Logout</h1>} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path='/customer/dashboard' element={<h1>Summary of Dashboard</h1>} />
        <Route path='/unauthorized' element={<p className='font-bold text-3xl mt-20 ml-20'>Unauthorized</p>} />
      </Routes>
    </Router>
  );
}

export default App;