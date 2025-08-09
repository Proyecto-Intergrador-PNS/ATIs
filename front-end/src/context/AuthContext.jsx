import { createContext, useState, useContext } from 'react';

/**
 * @file AuthContext.js
 * @description This file creates a React context for managing user authentication state.
 */

/**
 * The authentication context.
 * It provides the current user state, and functions for logging in and out.
 */
const AuthContext = createContext();

/**
 * A React Provider component that manages the authentication state.
 *
 * This provider uses `useState` to manage the `user` state,
 * which is initialized from local storage to persist the user session across page reloads.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider's scope.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  /**
   * Initializes the user state.
   *
   * It attempts to retrieve a user object from `localStorage` under the key "pos-user".
   * If a user is found, it's parsed from JSON; otherwise, the initial state is `null`.
   */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pos-user");
    return storedUser ? JSON.parse(storedUser) : null;
  })

  /**
   * Logs in a user.
   *
   * This function updates the user state and stores the user data and token in `localStorage`.
   * @param {Object} userData - The user object to be stored.
   * @param {string} token - The authentication token.
   */
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("pos-user", JSON.stringify(userData));
    localStorage.setItem("pos-token", token);
  }

  /**
   * Logs out the current user.
   *
   * This function clears the user state and removes the user data and token from `localStorage`.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("pos-user");
    localStorage.removeItem("pos-token");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
  
}

/**
 * A custom hook to use the authentication context.
 *
 * This hook simplifies accessing the `user`, `login`, and `logout` functions
 * provided by the `AuthProvider` component.
 *
 * @returns {{user: Object|null, login: Function, logout: Function}} The authentication context value.
 */
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;

