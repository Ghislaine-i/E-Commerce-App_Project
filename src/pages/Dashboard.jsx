import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { products, addProduct, updateProduct, deleteProduct, fetchProducts } =
        useContext(ProductContext);

    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        // Fetch all products when dashboard loads
        fetchProducts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        const result = await addProduct(formData);

        if (result.success) {
            setMessage({ type: "success", text: "Product created successfully!" });
            setFormData({ title: "", price: "", description: "", category: "", brand: "" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const result = await updateProduct(editingProduct.id, formData);

        if (result.success) {
            setMessage({ type: "success", text: "Product updated successfully!" });
            setEditingProduct(null);
            setFormData({ title: "", price: "", description: "", category: "", brand: "" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        const result = await deleteProduct(id);

        if (result.success) {
            setMessage({ type: "success", text: "Product deleted successfully!" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } else {
            setMessage({ type: "error", text: result.message });
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description || "",
            category: product.category || "",
            brand: product.brand || "",
        });
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setFormData({ title: "", price: "", description: "", category: "", brand: "" });
    };

    return (
        <div style={{ padding: "30px", maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "10px" }}>
                    Dashboard
                </h1>
                <p style={{ color: "#666", fontSize: "1.1rem" }}>
                    Welcome, <strong>{user?.firstName || user?.username}</strong>! Manage your products here.
                </p>
            </div>

            {/* Message Alert */}
            {message.text && (
                <div
                    style={{
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "25px",
                        background: message.type === "success" ? "#d1fae5" : "#fee2e2",
                        border: `1px solid ${message.type === "success" ? "#6ee7b7" : "#fecaca"}`,
                        color: message.type === "success" ? "#065f46" : "#991b1b",
                    }}
                >
                    {message.text}
                </div>
            )}

            {/* Create/Edit Form */}
            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "30px",
                }}
            >
                <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", color: "#333" }}>
                    {editingProduct ? "Edit Product" : "Create New Product"}
                </h2>

                <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "15px",
                            marginBottom: "20px",
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#374151",
                                }}
                            >
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Product Title"
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#374151",
                                }}
                            >
                                Price *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#374151",
                                }}
                            >
                                Category
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g., Electronics"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#374151",
                                }}
                            >
                                Brand
                            </label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                placeholder="Brand Name"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "600",
                                color: "#374151",
                            }}
                        >
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Product description..."
                            rows="3"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontFamily: "inherit",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "12px 24px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            {editingProduct ? "Update Product" : "Create Product"}
                        </button>

                        {editingProduct && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                style={{
                                    padding: "12px 24px",
                                    background: "#e5e7eb",
                                    color: "#374151",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Products Table */}
            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
                    <h2 style={{ fontSize: "1.5rem", color: "#333" }}>
                        Products List ({products.length})
                    </h2>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "#f9fafb" }}>
                        <tr>
                            <th
                                style={{
                                    padding: "15px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#374151",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                Product
                            </th>
                            <th
                                style={{
                                    padding: "15px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#374151",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                Price
                            </th>
                            <th
                                style={{
                                    padding: "15px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#374151",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                Category
                            </th>
                            <th
                                style={{
                                    padding: "15px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#374151",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                Rating
                            </th>
                            <th
                                style={{
                                    padding: "15px",
                                    textAlign: "right",
                                    fontWeight: "600",
                                    color: "#374151",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.slice(0, 20).map((product) => (
                            <tr
                                key={product.id}
                                style={{ borderBottom: "1px solid #e5e7eb" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "#f9fafb")
                                }
                                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                            >
                                <td style={{ padding: "15px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        <span style={{ fontWeight: "500", color: "#111827" }}>
                        {product.title}
                      </span>
                                    </div>
                                </td>
                                <td style={{ padding: "15px", color: "#667eea", fontWeight: "600" }}>
                                    ${product.price}
                                </td>
                                <td style={{ padding: "15px", color: "#6b7280" }}>
                                    {product.category}
                                </td>
                                <td style={{ padding: "15px", color: "#6b7280" }}>
                                    ⭐ {product.rating}
                                </td>
                                <td style={{ padding: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                        <button
                                            onClick={() => startEdit(product)}
                                            style={{
                                                padding: "8px 12px",
                                                background: "#dbeafe",
                                                color: "#1e40af",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            style={{
                                                padding: "8px 12px",
                                                background: "#fee2e2",
                                                color: "#991b1b",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;