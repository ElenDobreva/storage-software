import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceiverHomePage.css";

function ReceiverHomePage() {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [showEmailForm, setShowEmailForm] = useState(false);
  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

  const handleAccount = () => {
    navigate("/account");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", quantity: 50 },
    { id: 2, name: "Product 2", quantity: 25 },
    { id: 3, name: "Product 3", quantity: 15 },
  ]);

  const handleIncrement = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const handleDecrement = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const handleEmailChange = (e) => {
    setEmailData({ ...emailData, [e.targer.name]: e.target.value });
  };
  const handleEmailSend = (e) => {
    e.preventDefault();
    alert(
      `sending email to ${emailData.to} with subject "${emailData.subject}"`
    );
    setShowEmailForm(false);
  };

  return (
    <div className="receiver-home-container">
      <header className="receiver-home-header">
        <div className="hamburger-icon" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <h2 className="receiver-title">Receiver Page</h2>
      </header>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul onClick={toggleSidebar}>
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

      <main className="receiver-home-main">
        <div className="products-banner">Products</div>
        <div className="products-grid">
          {products.map((prod) => (
            <div key={prod.id} className="product-card">
              <p>{prod.name}</p>
              <p>Quantity: {prod.quantity}</p>
              <div className="product-actions">
                <button
                  className="plus-btn"
                  onClick={() => handleIncrement(prod.id)}
                >
                  +
                </button>
                <button
                  className="minus-btn"
                  onClick={() => handleDecrement(prod.id)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button className="floating-btn" onClick={toggleEmailForm}>
        Email
      </button>

      {showEmailForm && (
        <div className="email-form-overlay">
          <div className="email-form-container">
            <h3>Send Email</h3>
            <form onSubmit={handleEmailSend}>
              <label>To:</label>
              <input
                type="text"
                name="to"
                value={emailData.to}
                onChange={handleEmailChange}
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleEmailChange}
              />
              <label>Message:</label>
              <textarea
                name="message"
                value={emailData.message}
                onChange={handleEmailChange}
              />

              <div className="email-form-actions">
                <button type="submit">Send</button>
                <button type="button" onClick={() => setShowEmailForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiverHomePage;
