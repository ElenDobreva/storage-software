import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import ReceiverHomePage from "./pages/ReceiverHomePage";
import ProcessorHomePage from "./pages/ProcessorHomePage";
import MyAccountPage from "./pages/MyAccountPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/processor-home" element={<ProcessorHomePage />} />
          <Route path="/receiver-home" element={<ReceiverHomePage />} />
          <Route path="/account" element={<MyAccountPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
