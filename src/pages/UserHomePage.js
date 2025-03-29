import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./UserHomePage.css";

function UserHomePage() {
    const { logout } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleCart = () => {
        navigate("/cart", { state: { cart } });
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

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

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
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
                    <span className="storage-png">Storage App</span>
                </div>

                <div className="header-right">
                    <button className="cart-btn" onClick={handleCart}>
                        Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
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
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <p>{product.name}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="user-home-footer">
                <div className="contact-section">Contacts</div>
                <div className="info-section">Info</div>
            </footer>
        </div>
    );
}

export default UserHomePage;
