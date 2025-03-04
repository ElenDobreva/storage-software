import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/users")
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error(err);
        setError("Failt to load users");
      });
  }, []);

  if (error) {
    <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>There is no users or server is not started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <tr>{u.name}</tr>
                <tr>{u.email}</tr>
                <tr>{u.role}</tr>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
