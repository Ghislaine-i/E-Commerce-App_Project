import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    // Check if product is in wishlist
    const inWishlist = wishlist.some(item => item.id === product.id);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleCardClick = () => {
        // Only navigate for API products (numeric ids)
        if (typeof product.id === 'number') {
            navigate(`/product/${product.id}`);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: typeof product.id === 'number' ? "pointer" : "default",
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
                    height: "180px",
                    background: "#f9fafb",
                    overflow: "hidden",
                }}
            >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                    }}
                />

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            background: "#ef4444",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: "700",
                        }}
                    >
                        -{product.discountPercentage.toFixed(0)}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistToggle}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "32px",
                        height: "32px",
                        background: inWishlist
                            ? "rgba(239, 68, 68, 0.95)"
                            : "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "50%",
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    {inWishlist ? "❤️" : "🤍"}
                </button>
            </div>

            <div style={{ padding: "12px" }}>
                <h3
                    style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        marginBottom: "6px",
                        color: "#111827",
                        minHeight: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.title}
                </h3>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "700",
                                color: "#1f2937",
                            }}
                        >
                            ${product.price}
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <span style={{ color: "#fbbf24", fontSize: "14px" }}>⭐</span>
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#374151" }}>
                            {product.rating}
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                    <span
                        style={{
                            fontSize: "11px",
                            color: product.stock > 10 ? "#059669" : "#dc2626",
                            fontWeight: "600",
                        }}
                    >
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    disabled={product.stock === 0}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: product.stock === 0 ? "#e5e7eb" : "#1f2937",
                        color: product.stock === 0 ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: product.stock === 0 ? "not-allowed" : "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        if (product.stock > 0) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(31, 41, 55, 0.4)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                    }}
                >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;