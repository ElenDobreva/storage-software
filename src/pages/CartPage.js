import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./CartPage.css";

function CartPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/user-home");
  };

  const handleCompleteOrder = () => {
    alert("Order complete!");
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-home-btn" onClick={handleBackHome}>
          Back
        </button>
      </div>

      <div className="cart-bar">
        <h2>Cart</h2>
      </div>

      <div className="cart-items">
        <div className="cart-item">
          <div className="item-square"></div>
          <p>Product 1, Quantity: 2</p>
        </div>

        <div className="cart-item">
          <div className="item-square"></div>
          <p>Product 2, Quantity: 3</p>
        </div>
      </div>

      <button className="complete-order-btn" onClick={handleCompleteOrder}>
        Complete
      </button>
    </div>
  );
}

export default CartPage;
