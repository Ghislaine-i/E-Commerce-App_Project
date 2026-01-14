import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useContext(CartContext);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    const inWishlist = product && wishlist.some(item => item.id === product.id);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // If it's a local product (starts with 'my-')
                if (id && id.toString().startsWith("my-")) {
                    const stored = localStorage.getItem("myProducts");
                    const myProducts = stored ? JSON.parse(stored) : [];
                    const localProduct = myProducts.find(p => p.id === id);

                    if (localProduct) {
                        setProduct(localProduct);
                    } else {
                        setError("Product not found");
                    }
                } else {
                    const response = await api.get(`/products/${id}`);
                    setProduct(response.data);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success(`Added ${quantity} item(s) to cart!`);
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: "50px", height: "50px", border: "4px solid #e5e7eb", borderTop: "4px solid #1f2937", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
                    <p style={{ color: "#6b7280" }}>Loading product...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: "#f9fafb" }}>
                <p style={{ color: "#ef4444", fontSize: "18px", marginBottom: "20px" }}>{error}</p>
                <button onClick={() => navigate("/")} style={{ padding: "12px 24px", background: "#1f2937", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                    Back to Products
                </button>
            </div>
        );
    }

    if (!product) return null;

    const images = product.images || [product.thumbnail];

    return (
        <div style={{ minHeight: "calc(100vh - 70px)", background: "#f9fafb", padding: "30px 20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: "25px" }}>
                    <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#1f2937", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                        ← Back to Products
                    </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", background: "white", borderRadius: "16px", padding: "30px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                    {/* Image Gallery */}
                    <div>
                        <div style={{ background: "#f9fafb", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
                            <img src={images[selectedImage]} alt={product.title} style={{ width: "100%", height: "350px", objectFit: "contain" }} />
                        </div>
                        {images.length > 1 && (
                            <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            border: selectedImage === index ? "3px solid #1f2937" : "3px solid transparent",
                                            cursor: "pointer",
                                            background: "#f9fafb",
                                            padding: 0,
                                        }}
                                    >
                                        <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <p style={{ color: "#1f2937", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", marginBottom: "8px" }}>
                            {product.category}
                        </p>
                        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827", marginBottom: "12px" }}>
                            {product.title}
                        </h1>

                        {product.brand && (
                            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>
                                Brand: <strong>{product.brand}</strong>
                            </p>
                        )}

                        {/* Rating */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                            <span style={{ color: "#fbbf24", fontSize: "18px" }}>★</span>
                            <span style={{ fontSize: "16px", fontWeight: "600" }}>{product.rating}</span>
                            <span style={{ color: "#6b7280", fontSize: "14px" }}>({product.reviews?.length || 0} reviews)</span>
                        </div>

                        {/* Price */}
                        <div style={{ marginBottom: "20px" }}>
                            <span style={{ fontSize: "2.2rem", fontWeight: "800", color: "#1f2937" }}>
                                ${product.price}
                            </span>
                            {product.discountPercentage > 0 && (
                                <>
                                    <span style={{ fontSize: "1.1rem", color: "#9ca3af", textDecoration: "line-through", marginLeft: "12px" }}>
                                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                    <span style={{ background: "#ef4444", color: "white", padding: "3px 8px", borderRadius: "5px", fontSize: "12px", fontWeight: "600", marginLeft: "12px" }}>
                                        -{product.discountPercentage.toFixed(0)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
                            {product.description}
                        </p>

                        {/* Stock Status */}
                        <div style={{ marginBottom: "20px" }}>
                            <span style={{
                                color: product.stock > 10 ? "#059669" : product.stock > 0 ? "#d97706" : "#dc2626",
                                fontWeight: "600",
                                fontSize: "14px"
                            }}>
                                {product.stock > 10 ? `✓ In Stock (${product.stock} available)` :
                                    product.stock > 0 ? `⚠ Low Stock (${product.stock} left)` : "✗ Out of Stock"}
                            </span>
                        </div>

                        {/* Quantity Selector */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                            <span style={{ fontWeight: "600", color: "#374151", fontSize: "14px" }}>Quantity:</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "36px", height: "36px", background: "#f3f4f6", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer", fontWeight: "600" }}>-</button>
                                <span style={{ minWidth: "40px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: "36px", height: "36px", background: "#f3f4f6", border: "none", borderRadius: "8px", fontSize: "18px", cursor: "pointer", fontWeight: "600" }}>+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: "flex", gap: "12px", marginBottom: "25px" }}>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                style={{
                                    flex: 1,
                                    padding: "16px",
                                    background: product.stock === 0 ? "#e5e7eb" : "#1f2937",
                                    color: product.stock === 0 ? "#9ca3af" : "white",
                                    border: "none",
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    transition: "all 0.2s"
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                style={{
                                    padding: "14px 18px",
                                    background: "white",
                                    color: "#374151",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f3f4f6";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "white";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <svg
                                    width="24"
                                    height="24"
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

                        {/* Product Details */}
                        <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Product Details</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                {product.warrantyInformation && <p style={{ color: "#6b7280", fontSize: "13px" }}><strong>Warranty:</strong> {product.warrantyInformation}</p>}
                                {product.shippingInformation && <p style={{ color: "#6b7280", fontSize: "13px" }}><strong>Shipping:</strong> {product.shippingInformation}</p>}
                                {product.returnPolicy && <p style={{ color: "#6b7280", fontSize: "13px" }}><strong>Returns:</strong> {product.returnPolicy}</p>}
                                {product.sku && <p style={{ color: "#6b7280", fontSize: "13px" }}><strong>SKU:</strong> {product.sku}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div style={{ marginTop: "30px", background: "white", borderRadius: "16px", padding: "25px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px", color: "#111827" }}>
                            Customer Reviews ({product.reviews.length})
                        </h2>
                        <div style={{ display: "grid", gap: "15px" }}>
                            {product.reviews.map((review, index) => (
                                <div key={index} style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                        <div style={{ width: "36px", height: "36px", background: "#1f2937", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "600", fontSize: "14px" }}>
                                            {review.reviewerName?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: "600", color: "#111827", fontSize: "14px" }}>{review.reviewerName}</p>
                                            <div style={{ display: "flex", gap: "1px" }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} style={{ color: i < review.rating ? "#fbbf24" : "#e5e7eb", fontSize: "12px" }}>⭐</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ color: "#374151", lineHeight: "1.5", fontSize: "14px" }}>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
