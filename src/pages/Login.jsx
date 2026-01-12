import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            console.log("User already logged in, redirecting to home");
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate inputs
        if (!username || !password) {
            setError("Please enter both username and password");
            setLoading(false);
            return;
        }

        try {
            const result = await login(username.trim(), password.trim());

            if (result && result.success) {
                setTimeout(() => {
                    navigate("/");
                }, 100);
            } else {
                setError(result?.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login exception:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Quick fill demo credentials
    const fillDemoCredentials = () => {
        setUsername("emilys");
        setPassword("emilyspass");
        setError("");
    };

    return (
        <div
            style={{
                minHeight: "calc(100vh - 70px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1f2937",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
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
                        color: "#1f2937",
                    }}
                >
                    Welcome Back
                </h2>

                {/* Demo Credentials Info */}
                <div
                    style={{
                        background: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "25px",
                    }}
                >
                    <p style={{ margin: "0 0 10px 0", fontWeight: "600", color: "#1f2937" }}>
                        Demo Credentials:
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px", color: "#4b5563" }}>
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
                    <p style={{ margin: "5px 0", fontSize: "14px", color: "#4b5563" }}>
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
                    <button
                        onClick={fillDemoCredentials}
                        style={{
                            marginTop: "10px",
                            padding: "6px 12px",
                            background: "#1f2937",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Auto-fill Demo Credentials
                    </button>
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
                            autoComplete="username"
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                transition: "border-color 0.2s",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1f2937")}
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
                            autoComplete="current-password"
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                transition: "border-color 0.2s",
                                boxSizing: "border-box",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1f2937")}
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
                            background: loading ? "#9ca3af" : "#1f2937",
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
                                e.target.style.boxShadow = "0 4px 12px rgba(31, 41, 55, 0.4)";
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
            </div>
        </div>
    );
};

export default Login;