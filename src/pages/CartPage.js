import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./CartPage.css";

function CartPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext); 
    const cart = location.state?.cart || [];

    const handleBackHome = () => {
        navigate("/user-home");
    };

    const handleCompleteOrder = async () => {
        if (!user || !user.id) {
            alert("User not logged in or user ID is missing.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/orders/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    }))
                ),
            });

            if (response.ok) {
                alert("Order completed successfully!");
                navigate("/user-home");
            } else {
                alert("Failed to complete the order.");
            }
        } catch (error) {
            console.error("Error completing order:", error);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-square"></div>
                        <p>
                            {item.name}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="cart-total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
            </div>

            <button className="complete-order-btn" onClick={handleCompleteOrder}>
                Complete
            </button>
        </div>
    );
}

export default CartPage;
