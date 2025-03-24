import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./MyAccountPage.css";

function MyAccountPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isCustomer = user.role === "user";

  const [profile, setProfile] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    contractDate: user.contractDate || "",
    constractNumber: user.constractNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackHome = () => {
    switch (user.role) {
      case "admin":
        navigate("/admin-home");
        break;
      case "receiver":
        navigate("/receiver-home");
        break;
      case "processor":
        navigate("/processor-home");
        break;
      default:
        navigate("/user-home");
        break;
    }
  };

  return (
    <div className="myaccount-container">
      <div className="myaccount-header">
        <button onClick={handleBackHome} className="back-home-btn">
          Back
        </button>
      </div>

      <div className="profile-pic">
        <img src="images/profile-placeholder.png" alt="Profile" />
      </div>

      <div className="account=fields">
        <h2>My Account</h2>

        {!isCustomer && (
          <>
            <div className="field-row">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value="{profile.username}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value="{profile.email}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value="{profile.phone}"
                onChange={handleChange}
                disabled
              />
            </div>
          </>
        )}

        {isCustomer && (
          <div className="fields-grid-two">
            <div className="field-row">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value="{profile.username}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value="{profile.email}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value="{profile.phone}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value="{profile.address}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Contract Date:</label>
              <input
                type="date"
                name="contractDate"
                value="{profile.contractDate}"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="field-row">
              <label>Contract No:</label>
              <input
                type="text"
                name="contractNumber"
                value="{profile.contractNumber}"
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAccountPage;
