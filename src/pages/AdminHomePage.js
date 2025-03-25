import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css";

function AdminHomePage() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleEdit = (profileId) => {
        alert(`Edit profile with ID: ${profileId}`);
    };

    const handleDelete = (profileId) => {
        alert(`Delete profile with ID: ${profileId}`);
    };

    const [profiles, setProfiles] = useState([
        {
        id: 1,
        email: "topguzar@gmail.com",
        username: "klazarow",
        phone: "+359111555304",
        contractDate: "2025-04-30",
        contractNo: "K-115",
        role: "user",
        },
        {
        id: 2,
        email: "topguzarka@gmail.com",
        username: "edobrewa",
        phone: "+359557711357",
        contractDate: "2025-03-24",
        contractNo: "E-511",
        role: "user",
        },
    ]);

    const [showAddRow, setShowAddRow] = useState(false);

    const [newProfile, setNewProfile] = useState({
        email: "",
        username: "",
        phone: "",
        contractDate: "",
        contractNo: "",
        role: "",
    });

    const handleNewProfileChange = (e) => {
        const { name, value } = e.target;
        setNewProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveNewProfile = () => {
        const newId =
        profiles.length > 0 ? profiles[profiles.length - 1].id + 1 : 1;

        let finalContractDate = "";
        let finalContractNo = "";
        if (newProfile.role === "user") {
            finalContractDate = newProfile.contractDate;
            finalContractNo = newProfile.contractNo;
        }

        const profileToAdd = {
            id: newId,
            email: newProfile.email,
            username: newProfile.username,
            phone: newProfile.phone,
            contractDate: finalContractDate,
            contractNo: finalContractNo,
            role: newProfile.role,
        };

        setProfiles((prev) => [...prev, profileToAdd]);

        setNewProfile({
            email: "",
            username: "",
            phone: "",
            contractDate: "",
            contractNo: "",
            role: "user",
        });
        setShowAddRow(false);
    };

    const hadnleCancelNewProfile = () => {
        setShowAddRow(false);
        setNewProfile({
        email: "",
        username: "",
        phone: "",
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
                    <th>Username</th>
                    <th>Phone</th>
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
                    <td>{profile.username}</td>
                    <td>{profile.phone}</td>
                    <td>{profile.role === "user" ? profile.contractDate : ""}</td>
                    <td>{profile.role === "user" ? profile.contractNo : ""}</td>
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
                        name="username"
                        value={newProfile.username}
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
                        {newProfile.role === "user" ? (
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
                        {newProfile.role === "user" ? (
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
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                        <option value="receiver">receiver</option>
                        <option value="processor">processor</option>
                        </select>
                    </td>

                    <td>
                        <button className="save-btn" onClick={handleSaveNewProfile}>
                        Save
                        </button>
                        <button
                        className="cancel-btn"
                        onClick={hadnleCancelNewProfile}
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
