import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { toast } from "react-toastify";

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
                        top: "12px",
                        right: "12px",
                        width: "36px",
                        height: "36px",
                        background: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.2s",
                        padding: 0,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={inWishlist ? "#ef4444" : "none"}
                        stroke={inWishlist ? "#ef4444" : "#4b5563"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
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
                        toast.success(`'${product.title}' added to cart!`);
                    }}
                    disabled={product.stock === 0}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: product.stock === 0 ? "#e5e7eb" : "#1f2937",
                        color: product.stock === 0 ? "#9ca3af" : "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: product.stock === 0 ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                        if (product.stock > 0) {
                            e.currentTarget.style.background = "#000";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (product.stock > 0) {
                            e.currentTarget.style.background = "#1f2937";
                            e.currentTarget.style.transform = "translateY(0)";
                        }
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;