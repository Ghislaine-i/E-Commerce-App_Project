import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div
                style={{
                    minHeight: "calc(100vh - 70px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f9fafb",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            border: "4px solid #e5e7eb",
                            borderTop: "4px solid #1f2937",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 20px",
                        }}
                    />
                    <p style={{ color: "#6b7280", fontSize: "16px" }}>Loading...</p>
                    <style>
                        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                    </style>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;