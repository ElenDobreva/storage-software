import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceiverHomePage.css";

function ReceiverHomePage() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleAccount = () => {
    navigate("/account");
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, quantity: newQuantity } : product
          )
        );
      } else {
        alert("Failed to update product quantity");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  return (
    <div className="receiver-home-container">
      <header className="receiver-home-header">
        <div className="hamburger-icon" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <h2 className="receiver-title">Inventory Manager</h2>
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
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                backgroundColor: product.quantity < 5 ? "#ffcccc" : "#fff",
              }}
            >
              <p>{product.name}</p>
              <p>Quantity: {product.quantity}</p>
              <div className="product-actions">
                <button
                  className="plus-btn"
                  onClick={() =>
                    handleQuantityChange(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className="minus-btn"
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      product.quantity > 0 ? product.quantity - 1 : 0
                    )
                  }
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ReceiverHomePage;
