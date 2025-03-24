import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("*");
  const { fakeLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fakeLogin(username, role);

    if (role === "user") {
      navigate("/user-home");
    } else if (role === "admin") {
      navigate("/admin-home");
    } else if (role === "processor") {
      navigate("/processor-home");
    } else if (role === "receiver") {
      navigate("/receiver-home");
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Top Gun Storage</h1>
      </header>

      <div className="login-content">
        <h2 className="login-title">Enter the system</h2>

        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password: </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Role: </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="processor">Processor</option>
                <option value="receiver">Receiver</option>
              </select>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
