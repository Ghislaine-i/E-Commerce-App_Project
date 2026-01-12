import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optionally remove from wishlist after adding to cart
        // removeFromWishlist(product.id);
    };

    if (wishlist.length === 0) {
        return (
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>❤️</div>
                <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#333" }}>
                    Your wishlist is empty
                </h2>
                <p style={{ color: "#666", marginBottom: "30px" }}>
                    Save your favorite items here!
                </p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: "12px 30px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px", maxWidth: "1400px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <h1 style={{ fontSize: "2.5rem", color: "#333" }}>
                    My Wishlist ({wishlist.length})
                </h1>
                <button
                    onClick={clearWishlist}
                    style={{
                        padding: "10px 20px",
                        background: "#fee2e2",
                        color: "#991b1b",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Clear Wishlist
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "25px",
                }}
            >
                {wishlist.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                height: "220px",
                                background: "#f9fafb",
                            }}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    width: "35px",
                                    height: "35px",
                                    background: "rgba(255, 255, 255, 0.95)",
                                    border: "none",
                                    borderRadius: "50%",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                }}
                            >
                                ❤️
                            </button>
                        </div>

                        <div style={{ padding: "20px" }}>
                            <h3
                                style={{
                                    fontSize: "1.1rem",
                                    marginBottom: "8px",
                                    color: "#111827",
                                    minHeight: "50px",
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                style={{
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    marginBottom: "15px",
                                    minHeight: "40px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {item.description}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "15px",
                                }}
                            >
                <span
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#667eea",
                    }}
                >
                  ${item.price}
                </span>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <span style={{ color: "#fbbf24" }}>⭐</span>
                                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {item.rating}
                  </span>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    style={{
                                        flex: 1,
                                        padding: "12px",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    style={{
                                        padding: "12px",
                                        background: "#fee2e2",
                                        color: "#991b1b",
                                        border: "1px solid #fecaca",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;