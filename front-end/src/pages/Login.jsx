import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("null");
  const [loading, setLoading] = useState("false");
  const navigate = useNavigate();

  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login",
        {email, password});
        console.log(response.data)

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