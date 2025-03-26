import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // if (user) {
    //     switch (user.role) {
    //         case 'ADMIN':
    //             return <Navigate to="/admin-home" replace />;
    //         case 'CUSTOMER':
    //             return <Navigate to="/user-home" replace />;
    //         case 'ORDER_PROCESSOR':
    //             return <Navigate to="/processor-home" replace />;
    //         case 'INVENTORY_MANAGER':
    //             return <Navigate to="/receiver-home" replace />;
    //         default:;
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(username, password);
            if (response) {
                const { role } = response;
                switch (role) {
                    case "ADMIN":
                      navigate("/admin-home");
                      break;
                    case "ORDER_PROCESSOR":
                      navigate("/processor-home");
                      break;
                    case "INVENTORY_MANAGER":
                      navigate("/receiver-home");
                      break;
                    default:
                      navigate("/user-home");
                  }
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("An error occurred. Please try again.");
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
