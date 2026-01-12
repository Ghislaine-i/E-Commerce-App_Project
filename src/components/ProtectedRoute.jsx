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
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        border: "4px solid #f3f3f6",
                        borderTop: "4px solid #667eea",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        animation: "spin 1s linear infinite",
                    }}
                />
                <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the protected component
    return children;
};

export default ProtectedRoute;