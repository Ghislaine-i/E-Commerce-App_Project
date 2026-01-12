import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    // Check if product is in wishlist
    const inWishlist = wishlist.some(item => item.id === product.id);

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div
            style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
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
                    height: "200px",
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
                            padding: "5px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                        }}
                    >
                        -{product.discountPercentage.toFixed(0)}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle();
                    }}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "35px",
                        height: "35px",
                        background: inWishlist
                            ? "rgba(239, 68, 68, 0.95)"
                            : "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "50%",
                        fontSize: "18px",
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

            <div style={{ padding: "15px" }}>
                <h3
                    style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "#111827",
                        minHeight: "48px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.title}
                </h3>

                <p
                    style={{
                        color: "#6b7280",
                        fontSize: "13px",
                        marginBottom: "12px",
                        minHeight: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.description}
                </p>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                    }}
                >
                    <div>
            <span
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#667eea",
                    marginRight: "8px",
                }}
            >
              ${product.price}
            </span>
                        {product.discountPercentage > 0 && (
                            <span
                                style={{
                                    fontSize: "0.9rem",
                                    color: "#9ca3af",
                                    textDecoration: "line-through",
                                }}
                            >
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
                        )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ color: "#fbbf24", fontSize: "16px" }}>⭐</span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
              {product.rating}
            </span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    {product.brand && (
                        <span
                            style={{
                                fontSize: "12px",
                                color: "#6b7280",
                                background: "#f3f4f6",
                                padding: "4px 8px",
                                borderRadius: "4px",
                            }}
                        >
              {product.brand}
            </span>
                    )}
                    <span
                        style={{
                            fontSize: "12px",
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
                        padding: "12px",
                        background:
                            product.stock === 0
                                ? "#e5e7eb"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: product.stock === 0 ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: product.stock === 0 ? "not-allowed" : "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        if (product.stock > 0) {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
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