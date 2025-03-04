import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/requests")
      .then((response) => setRequests(response.data))
      .catch((err) => {
        console.error(err);
        setError("Faild to load requests");
      });
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>Requests</h2>
      {requests.length === 0 ? (
        <p>There is no requests or server is not started.</p>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r.id}>
              Product: {r.productName}, Quantity: {r.quantity}, Status:{" "}
              {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Requests;
