import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((err) => {
        console.error(err);
        setError("Invalid load products");
      });
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>Products's list</h2>
      <Link to="/products/new">Add new product</Link>
      {products.length === 0 ? (
        <p>There is not found products or sever is not started.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - Quantity: {p.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
