import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
function AdminLogin(){
  const navigate = useNavigate();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/admins/login", {
      email: email,
      password: password
    });
    sessionStorage.setItem("adminToken", response.data.token);
    navigate("/admin");

    console.log(response.data.message);
  } catch (error) {
    console.log(error.response?.data?.message || "Login failed");
  }
};


    return (
  <div className="admin-login-page">
    <div className="admin-login-card">
      <h2>Admin Login</h2>
      <p>Sign in to manage your clinic</p>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="admin-login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
);
}
export  default AdminLogin;