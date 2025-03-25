import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./UserHomePage.css";

function UserHomePage() {
    const { logout } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate();

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleCart = () => {
        navigate("/cart");
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="user-home-container">
        <header className="user-home-header">
            <div className="hamburger-icon" onClick={showSidebar}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            </div>

            <div className="header-center">
            <span className="storage-png">Storage snimka</span>
            </div>

            <div className="header-right">
            <button className="cart-btn" onClick={handleCart}>
                BRUM
            </button>
            </div>
        </header>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul onClick={showSidebar}>
            <li className="nav-toggle">
                <div className="close-icon">X</div>
            </li>
            <li>
                <button className="nav-btn" onClick={handleAccount}>
                My Account
                </button>
            </li>
            <li>
                <button className="nav-btn" onClick={handleLogout}>
                Log Out
                </button>
            </li>
            </ul>
        </nav>

        <main className="user-home-main">
            <div className="products-banner">Products</div>
            <div className="products-grid">
            <div className="product-card">Product 1</div>
            <div className="product-card">Product 2</div>
            <div className="product-card">Product 3</div>
            </div>
        </main>

        <footer className="user-home-footer">
            <div className="contact-section">Aloo</div>
            <div className="info-section">ZDR</div>
        </footer>
        </div>
    );
}

export default UserHomePage;
