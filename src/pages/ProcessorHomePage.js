import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProcessorHomePage.css";

function ProcessorHomePage() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const closeSidebar = () => {
        setSidebar(false);
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
            const data = await response.json();
            setOrderDetails(data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStatus),
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                alert("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleOrderClick = (orderId) => {
        setSelectedOrder(orderId);
        fetchOrderDetails(orderId);
    };

    return (
        <div className="processor-home-container">
            <header className="processor-home-header">
                <div className="header-left">
                    <div className="hamburger-icon" onClick={toggleSidebar}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <h2 className="processor-title">Processor Page</h2>
                </div>
            </header>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul>
                    <li className="nav-toggle">
                        <div className="close-icon" onClick={closeSidebar}>
                            X
                        </div>
                    </li>
                    <li>
                        <button className="nav-btn" onClick={handleAccount}>
                            My Account
                        </button>
                        <button className="nav-btn" onClick={handleLogout}>
                            Log Out
                        </button>
                    </li>
                </ul>
            </nav>

            <main className="processor-home-main">
                <h2>Orders</h2>
                <table className="processor-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer.name}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleOrderClick(order.id)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedOrder && orderDetails && (
                    <div className="order-details">
                        <h3>Order Details (ID: {selectedOrder})</h3>
                        <ul>
                            {orderDetails.items.map((item) => (
                                <li key={item.id}>
                                    {item.product.name} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProcessorHomePage;
