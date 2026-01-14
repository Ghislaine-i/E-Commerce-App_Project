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
                        fontSize: "1.6rem",
                        fontWeight: "800",
                        color: "white",
                        textDecoration: "none",
                        letterSpacing: "-1px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    Collections
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
                            Dashboard
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
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