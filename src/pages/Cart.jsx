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
                    minHeight: "calc(100vh - 70px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    background: "#f9fafb",
                }}
            >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛒</div>
                <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#1f2937" }}>
                    Your cart is empty
                </h2>
                <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                    Add some products to get started!
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
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "calc(100vh - 70px)", background: "#f9fafb", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h1 style={{ fontSize: "2rem", color: "#1f2937" }}>Shopping Cart</h1>
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

                <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "20px" }}>
                    {/* Cart Items */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            padding: "20px",
                        }}
                    >
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    gap: "15px",
                                    padding: "15px 0",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: "1rem", marginBottom: "5px", color: "#1f2937" }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "10px" }}>
                                        {item.description?.substring(0, 60)}...
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    background: "#f3f4f6",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "16px",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                -
                                            </button>
                                            <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "600" }}>
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    background: "#f3f4f6",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "16px",
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
                                                padding: "6px 12px",
                                                background: "#fee2e2",
                                                color: "#991b1b",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "12px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1f2937" }}>
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                    <p style={{ color: "#6b7280", fontSize: "12px" }}>
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
                            padding: "20px",
                            height: "fit-content",
                        }}
                    >
                        <h2 style={{ fontSize: "1.3rem", marginBottom: "20px", color: "#1f2937" }}>
                            Order Summary
                        </h2>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e5e7eb" }}>
                            <span style={{ color: "#6b7280" }}>Subtotal</span>
                            <span style={{ fontWeight: "600" }}>${getCartTotal().toFixed(2)}</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e5e7eb" }}>
                            <span style={{ color: "#6b7280" }}>Shipping</span>
                            <span style={{ fontWeight: "600", color: "#10b981" }}>Free</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "1.2rem" }}>
                            <span style={{ fontWeight: "700" }}>Total</span>
                            <span style={{ fontWeight: "700", color: "#1f2937" }}>${getCartTotal().toFixed(2)}</span>
                        </div>

                        <button
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#1f2937",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginBottom: "10px",
                            }}
                            onClick={() => alert("Checkout functionality would go here!")}
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#f3f4f6",
                                color: "#374151",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;