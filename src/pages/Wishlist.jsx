import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success("Added to cart!");
    };

    // Pagination
    const totalPages = Math.ceil(wishlist.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = wishlist.slice(indexOfFirst, indexOfLast);

    if (wishlist.length === 0) {
        return (
            <div
                style={{
                    minHeight: "calc(100vh - 70px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    background: "#f9fafb",
                }}
            >
                <div style={{ marginBottom: "20px", color: "#d1d5db" }}>
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#1f2937" }}>
                    Your wishlist is empty
                </h2>
                <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                    Save your favorite items here!
                </p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: "12px 30px",
                        background: "#1f2937",
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
        <div style={{ minHeight: "calc(100vh - 70px)", background: "#f9fafb", padding: "20px" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h1 style={{ fontSize: "2rem", color: "#1f2937" }}>
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
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                background: "white",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    height: "180px",
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
                                        width: "32px",
                                        height: "32px",
                                        background: "rgba(255, 255, 255, 0.95)",
                                        border: "none",
                                        borderRadius: "50%",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="#ef4444"
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            <div style={{ padding: "15px" }}>
                                <h3 style={{ fontSize: "1rem", marginBottom: "8px", color: "#1f2937", minHeight: "44px" }}>
                                    {item.title}
                                </h3>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1f2937" }}>
                                        ${item.price}
                                    </span>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                        <span style={{ color: "#fbbf24" }}>⭐</span>
                                        <span style={{ fontSize: "13px", fontWeight: "600" }}>{item.rating}</span>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        style={{
                                            flex: 1,
                                            padding: "10px",
                                            background: "#1f2937",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        style={{
                                            padding: "10px",
                                            background: "#fee2e2",
                                            color: "#991b1b",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "13px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "25px" }}>
                        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} style={{ padding: "8px 16px", background: currentPage === 1 ? "#e5e7eb" : "#1f2937", color: currentPage === 1 ? "#9ca3af" : "white", border: "none", borderRadius: "6px", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "600" }}>Previous</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index + 1} onClick={() => setCurrentPage(index + 1)} style={{ padding: "8px 12px", background: currentPage === index + 1 ? "#1f2937" : "white", color: currentPage === index + 1 ? "white" : "#1f2937", border: currentPage === index + 1 ? "none" : "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>{index + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} style={{ padding: "8px 16px", background: currentPage === totalPages ? "#e5e7eb" : "#1f2937", color: currentPage === totalPages ? "#9ca3af" : "white", border: "none", borderRadius: "6px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "600" }}>Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;