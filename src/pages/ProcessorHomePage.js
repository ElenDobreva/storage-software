import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProcessorHomePage.css";

function ProcessorHomePage() {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
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

  const [orders, setOrders] = useState([
    {
      id: 1,
      username: "Rilchevs mafia",
      email: "rilchevsmafia@gmail.com",
      phone: "0874562589",
      items: "Clock-19, Ar-15",
      status: "Pending",
    },
    {
      id: 2,
      username: "Dobrevs mafia",
      email: "dobrevsmafia@gmail.com",
      phone: "0886645597",
      items: "AK-47",
      status: "Pending",
    },
  ]);

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
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
        <table className="processor-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.items}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default ProcessorHomePage;
