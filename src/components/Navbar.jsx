import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { getCartCount } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav
            style={{
                background: "#1f2937",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "15px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: "700",
                        color: "white",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                    🛍️ E-HUB Collections
                </Link>

                {/* Navigation Links */}
                <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                    <Link
                        to="/"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            fontSize: "16px",
                            fontWeight: "500",
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                        Products
                    </Link>

                    {user && (
                        <Link
                            to="/dashboard"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                            onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                            📊 Dashboard
                        </Link>
                    )}

                    {/* Cart */}
                    <Link
                        to="/cart"
                        style={{
                            position: "relative",
                            color: "white",
                            textDecoration: "none",
                            fontSize: "22px",
                            transition: "transform 0.2s",
                            display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        🛒
                        {getCartCount() > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-10px",
                                    background: "#ef4444",
                                    color: "white",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                }}
                            >
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {/* Wishlist */}
                    <Link
                        to="/wishlist"
                        style={{
                            position: "relative",
                            color: "white",
                            textDecoration: "none",
                            fontSize: "22px",
                            transition: "transform 0.2s",
                            display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    >
                        ❤️
                        {wishlist.length > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-10px",
                                    background: "#ec4899",
                                    color: "white",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                }}
                            >
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Auth Buttons */}
                    {user ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <span
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                Hi, {user.firstName || user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: "8px 16px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
                                onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link to="/login">
                                <button
                                    style={{
                                        padding: "8px 16px",
                                        background: "white",
                                        color: "#1f2937",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;