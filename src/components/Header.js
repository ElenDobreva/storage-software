import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ background: "#ccc", padding: "10px" }}>
      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>
            Board
          </Link>
          <Link to="/products" style={{ marginRight: "10px" }}>
            Products
          </Link>
          <Link to="/requests" style={{ marginRight: "10px" }}>
            Requests
          </Link>
          {user.role === "admin" && (
            <Link to="/users" style={{ marginRight: "10px" }}>
              Users
            </Link>
          )}

          <button onClick={handleLogout}>Exit</button>
        </>
      ) : (
        <Link to="/">Enter</Link>
      )}
    </nav>
  );
}

export default Header;
