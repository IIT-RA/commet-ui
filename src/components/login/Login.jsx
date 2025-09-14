import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const commentLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/home"); // Redirect to homepage
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="Codes Are Everywhere" className="logo" />
      <h2>Login</h2>
      <form onSubmit={commentLogin}>
        <input type="text" placeholder="Username" value={username} 
        onChange = {(e)=>setUsername(e.target.value)} 
        required />
        <input type="password" placeholder="Password" value={password}
        onChange={(e)=>setPassword(e.target.value)} required />
        <input type="submit" value="Login" />
      </form>
      <div className="footer">
        © 2025 Codes Are Everywhere
      </div>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

    </div>
  );
}
export default Login;
