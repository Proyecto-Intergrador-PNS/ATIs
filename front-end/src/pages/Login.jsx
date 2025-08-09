import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";


/**
 * @file Login.js
 * @description This file contains the Login component, which handles user authentication.
 */

/**
 * Renders the login form component.
 *
 * This component manages the state for email, password, and error messages. It handles form
 * submission, communicates with the authentication API, and redirects the user upon successful login
 * using the `useAuth` hook and `react-router-dom`.
 *
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
   // --- State Hooks ---
  /**
   * Manages the state for the email input field.
   */
  const [email, setEmail] = useState("");
  /**
   * Manages the state for the password input field.
   */
  const [password, setPassword] = useState("");
  /**
   * Stores any error messages received during the login process.
   * Initial state is `null`.
   */
  const [error, setError] = useState("null");
  /**
   * Manages the loading state, used to show feedback to the user (e.g., a "Loading..." button).
   */
  const [loading, setLoading] = useState("false");
   // --- React Hooks ---
  /**
   * Hook to programmatically navigate to a different route.
   */
  const navigate = useNavigate();
  /**
   * Hook to access the authentication context, specifically the `login` function.
   */

  const {login} = useAuth();
// --- Event Handlers ---
  /**
   * Handles the form submission logic.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  

    try {
      /**
       * Sends a POST request to the login API endpoint with email and password.
       */
      const response = await axios.post("http://localhost:3000/api/auth/login",
        {email, password});
        console.log(response.data)
      /**
       * If the login is successful, it calls the `login` function from the AuthContext,
       * stores the user data and token, and navigates based on the user's role.
       */
      
      if (response.data.success) {
        await login(response.data.user, response.data.token)
        if(response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        }else {
          navigate("/customer/dashboard")
        }
      }else {
        alert(response.data.error)
      }


    } catch (error) {
      if(error.response) {
        setError(error.response.data.message);
      }
    }finally {
      setLoading(false);
    }
    

  };


  return (
    <div className="login-container">
      <h1>Login</h1>\
      { error && (
        <div className="bg-red-200 text red-700 p-2 mb-4.rouded">
          {error}
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  )
}

export default Login;