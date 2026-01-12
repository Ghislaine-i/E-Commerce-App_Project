import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const { user, logout, getToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        thumbnail: "",
    });

    // Load products from localStorage on mount
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        loadProducts();
    }, [user, navigate]);

    // Load products from localStorage
    const loadProducts = () => {
        const stored = localStorage.getItem("myProducts");
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    };

    // Save products to localStorage
    const saveProducts = (updatedProducts) => {
        localStorage.setItem("myProducts", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Open modal for creating new product
    const openCreateModal = () => {
        setEditingProduct(null);
        setFormData({
            title: "",
            description: "",
            price: "",
            category: "",
            brand: "",
            stock: "",
            thumbnail: "",
        });
        setShowModal(true);
    };

    // Open modal for editing product
    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            brand: product.brand || "",
            stock: product.stock,
            thumbnail: product.thumbnail,
        });
        setShowModal(true);
    };

    // Create or Update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingProduct) {
                // Update existing product
                const updatedProducts = products.map((p) =>
                    p.id === editingProduct.id
                        ? {
                            ...p,
                            ...formData,
                            price: parseFloat(formData.price),
                            stock: parseInt(formData.stock),
                        }
                        : p
                );
                saveProducts(updatedProducts);
                alert("Product updated successfully!");
            } else {
                // Create new product
                const newProduct = {
                    id: Date.now(), // Use timestamp as unique ID
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    rating: 0,
                    createdAt: new Date().toISOString(),
                };
                saveProducts([...products, newProduct]);
                alert("Product created successfully!");
            }

            setShowModal(false);
            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                stock: "",
                thumbnail: "",
            });
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const updatedProducts = products.filter((p) => p.id !== productId);
            saveProducts(updatedProducts);
            alert("Product deleted successfully!");
        }
    };

    // Handle image URL input
    const handleImageChange = (e) => {
        setFormData({ ...formData, thumbnail: e.target.value });
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
            {/* Header */}
            <div
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0, fontSize: "24px" }}>Product Dashboard</h1>
                        <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
                            Welcome, {user?.firstName || user?.username}!
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            padding: "10px 20px",
                            background: "rgba(255,255,255,0.2)",
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
                {/* Create Button */}
                <div style={{ marginBottom: "30px" }}>
                    <button
                        onClick={openCreateModal}
                        style={{
                            padding: "12px 24px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
                        }}
                    >
                        + Create New Product
                    </button>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            background: "white",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <p style={{ fontSize: "18px", color: "#6b7280", margin: 0 }}>
                            No products yet. Create your first product!
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    background: "white",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    transition: "transform 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = "translateY(-4px)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = "translateY(0)")
                                }
                            >
                                {/* Product Image */}
                                <div
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        background: "#f3f4f6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    {product.thumbnail ? (
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.parentElement.innerHTML =
                                                    '<div style="color: #9ca3af; font-size: 14px;">No Image</div>';
                                            }}
                                        />
                                    ) : (
                                        <span style={{ color: "#9ca3af", fontSize: "14px" }}>
                                            No Image
                                        </span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div style={{ padding: "16px" }}>
                                    <h3
                                        style={{
                                            margin: "0 0 8px 0",
                                            fontSize: "18px",
                                            color: "#111827",
                                        }}
                                    >
                                        {product.title}
                                    </h3>
                                    <p
                                        style={{
                                            margin: "0 0 12px 0",
                                            fontSize: "14px",
                                            color: "#6b7280",
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
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "700",
                                                color: "#667eea",
                                            }}
                                        >
                                            ${product.price}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#6b7280",
                                                background: "#f3f4f6",
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            onClick={() => openEditModal(product)}
                                            style={{
                                                flex: 1,
                                                padding: "8px",
                                                background: "#3b82f6",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            style={{
                                                flex: 1,
                                                padding: "8px",
                                                background: "#ef4444",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "20px",
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowModal(false);
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            padding: "30px",
                            maxWidth: "500px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflowY: "auto",
                        }}
                    >
                        <h2 style={{ margin: "0 0 20px 0", fontSize: "24px" }}>
                            {editingProduct ? "Edit Product" : "Create New Product"}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                        resize: "vertical",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "16px",
                                    marginBottom: "16px",
                                }}
                            >
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "6px",
                                            fontWeight: "600",
                                            color: "#374151",
                                        }}
                                    >
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #d1d5db",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "6px",
                                            fontWeight: "600",
                                            color: "#374151",
                                        }}
                                    >
                                        Stock *
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #d1d5db",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "6px",
                                        fontWeight: "600",
                                        color: "#374151",
                                    }}
                                >
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={handleImageChange}
                                    placeholder="https://example.com/image.jpg"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                    }}
                                />
                                {formData.thumbnail && (
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            padding: "10px",
                                            border: "1px solid #d1d5db",
                                            borderRadius: "6px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img
                                            src={formData.thumbnail}
                                            alt="Preview"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "150px",
                                                borderRadius: "6px",
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.parentElement.innerHTML =
                                                    '<p style="color: #ef4444; margin: 0;">Invalid image URL</p>';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div style={{ display: "flex", gap: "12px" }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        padding: "12px",
                                        background: loading
                                            ? "#9ca3af"
                                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        cursor: loading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {loading ? "Saving..." : editingProduct ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        flex: 1,
                                        padding: "12px",
                                        background: "#6b7280",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;