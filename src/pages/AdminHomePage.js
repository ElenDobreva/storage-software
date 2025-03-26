import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css";

function AdminHomePage() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [showAddRow, setShowAddRow] = useState(false);
    const [newProfile, setNewProfile] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        contractDate: "",
        contractNo: "",
        role: "",
    });

    
    const [passwordVisibility, setPasswordVisibility] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users");
            const data = await response.json();
            setProfiles(data);

            
            const visibilityState = {};
            data.forEach((user) => {
                visibilityState[user.id] = false; 
            });
            setPasswordVisibility(visibilityState);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleNewProfileChange = (e) => {
        const { name, value } = e.target;
        setNewProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleSaveNewProfile = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProfile),
            });

            if (response.ok) {
                const addedUser = await response.json();
                setProfiles((prev) => [...prev, addedUser]);
                setShowAddRow(false);
                setNewProfile({
                    email: "",
                    name: "",
                    phone: "",
                    password: "",
                    contractDate: "",
                    contractNo: "",
                    role: "",
                });

                
                setPasswordVisibility((prev) => ({
                    ...prev,
                    [addedUser.id]: false, 
                }));
            } else {
                alert("Failed to add user");
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const togglePasswordVisibility = (userId) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [userId]: !prev[userId], 
        }));
    };

    const handleEdit = async (profileId, updatedProfile) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${profileId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setProfiles((prev) =>
                    prev.map((profile) => (profile.id === profileId ? updatedUser : profile))
                );
            } else {
                alert("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async (profileId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${profileId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProfiles((prev) => prev.filter((profile) => profile.id !== profileId));
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleCancelNewProfile = () => {
        setShowAddRow(false);
        setNewProfile({
            email: "",
            name: "",
            phone: "",
            password: "",
            contractDate: "",
            contractNo: "",
            role: "",
        });
    };

    return (
        <div className="admin-home-container">
            <header className="admin-home-header">
                <div className="hamburger-icon" onClick={toggleSidebar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <h2 className="admin-title">Admin Page</h2>
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

            <main className="admin-home-main">
                <h2>All Profiles</h2>
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Password</th>
                                <th>Contract Date</th>
                                <th>Contract No</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile) => (
                                <tr key={profile.id}>
                                    <td>{profile.email}</td>
                                    <td>{profile.name}</td>
                                    <td>{profile.phone}</td>
                                    <td>
                                        {passwordVisibility[profile.id]
                                            ? profile.password 
                                            : "••••••"} {}
                                        <button
                                            className="toggle-password-btn"
                                            onClick={() => togglePasswordVisibility(profile.id)}
                                        >
                                            {passwordVisibility[profile.id] ? "Hide" : "Show"}
                                        </button>
                                    </td>
                                    <td>{profile.role === "CUSTOMER" ? profile.contractDate : ""}</td>
                                    <td>{profile.role === "CUSTOMER" ? profile.contractNo : ""}</td>
                                    <td>{profile.role}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(profile.id)}
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(profile.id)}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {showAddRow && (
                                <tr>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={newProfile.email}
                                            onChange={handleNewProfileChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProfile.name}
                                            onChange={handleNewProfileChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={newProfile.phone}
                                            onChange={handleNewProfileChange}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="password"
                                            name="password"
                                            value={newProfile.password}
                                            onChange={handleNewProfileChange}
                                        />
                                    </td>

                                    <td>
                                        {newProfile.role === "CUSTOMER" ? (
                                            <input
                                                type="date"
                                                name="contractDate"
                                                value={newProfile.contractDate}
                                                onChange={handleNewProfileChange}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                disabled
                                                placeholder="N/A"
                                                name="contractDate"
                                                style={{ backgroundColor: "#eee" }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {newProfile.role === "CUSTOMER" ? (
                                            <input
                                                type="text"
                                                name="contractNo"
                                                value={newProfile.contractNo}
                                                onChange={handleNewProfileChange}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                disabled
                                                placeholder="N/A"
                                                style={{ backgroundColor: "#eee" }}
                                            />
                                        )}
                                    </td>

                                    <td>
                                        <select
                                            name="role"
                                            value={newProfile.role}
                                            onChange={handleNewProfileChange}
                                        >
                                            <option value="">Select role</option>
                                            <option value="CUSTOMER">Customer</option>
                                            <option value="ADMIN">Admin</option>
                                            <option value="INVENTORY_MANAGER">Inventory Manager</option>
                                            <option value="ORDER_PROCESSOR">Order processor</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button className="save-btn" onClick={handleSaveNewProfile}>
                                            Save
                                        </button>
                                        <button
                                            className="cancel-btn"
                                            onClick={handleCancelNewProfile}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="add-btn-container">
                        <button
                            className="add-profile-btn"
                            onClick={() => setShowAddRow(true)}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminHomePage;
