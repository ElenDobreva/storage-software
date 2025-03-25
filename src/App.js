import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import ReceiverHomePage from "./pages/ReceiverHomePage";
import ProcessorHomePage from "./pages/ProcessorHomePage";
import MyAccountPage from "./pages/MyAccountPage";
import CartPage from "./pages/CartPage";

/* 
    Checks if user is logged in before 
    authorizing access to a page.
*/
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
  
    // User is NOT logged in. Redirect to the login page
    if (!user) {
        return <Navigate to="/" replace />;
    }
  
    return children;
};

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={ <LoginPage /> }/>
                <Route path="/user-home" element={ 
                    <ProtectedRoute>
                        <UserHomePage />
                    </ProtectedRoute> 
                }/>
                <Route path="/cart" element={ 
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute> 
                }/>
                <Route path="/admin-home" element={ 
                    <ProtectedRoute>
                        <AdminHomePage/>
                    </ProtectedRoute> 
                }/>
                <Route path="/processor-home" element={ 
                    <ProtectedRoute>
                        <ProcessorHomePage />
                    </ProtectedRoute> 
                }/>
                <Route path="/receiver-home" element={ 
                    <ProtectedRoute>
                        <ReceiverHomePage />
                    </ProtectedRoute> 
                }/>
                <Route path="/account" element={ 
                    <ProtectedRoute>
                        <MyAccountPage />
                    </ProtectedRoute> 
                }/>
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
