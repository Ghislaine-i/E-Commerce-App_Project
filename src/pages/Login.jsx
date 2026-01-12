import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await login(username, password);

            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message || "Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "450px",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontSize: "2rem",
                        color: "#333",
                    }}
                >
                    Welcome Back
                </h2>

                {/* Demo Credentials Info */}
                <div
                    style={{
                        background: "#e0f2fe",
                        border: "1px solid #7dd3fc",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "25px",
                    }}
                >
                    <p style={{ margin: "0 0 10px 0", fontWeight: "600", color: "#0369a1" }}>
                        Demo Credentials:
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px", color: "#0c4a6e" }}>
                        <strong>Username:</strong>{" "}
                        <code
                            style={{
                                background: "white",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontSize: "13px",
                            }}
                        >
                            emilys
                        </code>
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px", color: "#0c4a6e" }}>
                        <strong>Password:</strong>{" "}
                        <code
                            style={{
                                background: "white",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontSize: "13px",
                            }}
                        >
                            emilyspass
                        </code>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#374151",
                            }}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        />
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#374151",
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                        />
                    </div>

                    {error && (
                        <div
                            style={{
                                background: "#fee2e2",
                                border: "1px solid #fecaca",
                                color: "#991b1b",
                                padding: "12px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                                fontSize: "14px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: loading
                                ? "#9ca3af"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#667eea",
                                fontWeight: "600",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;