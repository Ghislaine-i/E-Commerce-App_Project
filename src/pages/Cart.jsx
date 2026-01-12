import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
        useContext(CartContext);
    const navigate = useNavigate();

    if (cart.length === 0) {
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
                <div
                    style={{
                        fontSize: "4rem",
                        marginBottom: "20px",
                    }}
                >
                    🛒
                </div>
                <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#333" }}>
                    Your cart is empty
                </h2>
                <p style={{ color: "#666", marginBottom: "30px" }}>
                    Add some products to get started!
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
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <h1 style={{ fontSize: "2.5rem", color: "#333" }}>Shopping Cart</h1>
                <button
                    onClick={clearCart}
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
                    Clear Cart
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                {/* Cart Items */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        padding: "25px",
                    }}
                >
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                gap: "20px",
                                padding: "20px 0",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />

                            <div style={{ flex: 1 }}>
                                <h3
                                    style={{
                                        fontSize: "1.2rem",
                                        marginBottom: "8px",
                                        color: "#111827",
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "15px" }}>
                                    {item.description?.substring(0, 100)}...
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                background: "#f3f4f6",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                            }}
                                        >
                                            -
                                        </button>
                                        <span
                                            style={{
                                                minWidth: "40px",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                            }}
                                        >
                      {item.qty}
                    </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                background: "#f3f4f6",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "18px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            padding: "8px 16px",
                                            background: "#fee2e2",
                                            color: "#991b1b",
                                            border: "1px solid #fecaca",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <p
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                        color: "#667eea",
                                        marginBottom: "10px",
                                    }}
                                >
                                    ${(item.price * item.qty).toFixed(2)}
                                </p>
                                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                                    ${item.price} each
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        padding: "25px",
                    }}
                >
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
                        Order Summary
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "15px",
                            paddingBottom: "15px",
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <span style={{ color: "#6b7280" }}>Subtotal</span>
                        <span style={{ fontWeight: "600" }}>${getCartTotal().toFixed(2)}</span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "15px",
                            paddingBottom: "15px",
                            borderBottom: "1px solid #e5e7eb",
                        }}
                    >
                        <span style={{ color: "#6b7280" }}>Shipping</span>
                        <span style={{ fontWeight: "600", color: "#10b981" }}>Free</span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "25px",
                            fontSize: "1.3rem",
                        }}
                    >
                        <span style={{ fontWeight: "700" }}>Total</span>
                        <span style={{ fontWeight: "700", color: "#667eea" }}>
              ${getCartTotal().toFixed(2)}
            </span>
                    </div>

                    <button
                        style={{
                            width: "100%",
                            padding: "15px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginBottom: "15px",
                        }}
                        onClick={() => alert("Checkout functionality would go here!")}
                    >
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        style={{
                            width: "100%",
                            padding: "15px",
                            background: "#f3f4f6",
                            color: "#374151",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;