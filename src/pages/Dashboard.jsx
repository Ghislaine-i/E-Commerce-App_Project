import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        thumbnail: "",
    });
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        // Load products, categories and users on mount
        loadInitialData();
    }, [user, navigate]);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            // Fetch categories
            const categoriesRes = await api.get("/products/category-list");
            setCategories(categoriesRes.data);

            // Fetch API products (Emily's products are more like 10)
            const apiRes = await api.get("/products?limit=10");

            // Get local storage data
            const storedMyProducts = localStorage.getItem("myProducts");
            const myProducts = storedMyProducts ? JSON.parse(storedMyProducts) : [];

            const storedDeleted = localStorage.getItem("deletedProducts");
            const deletedIds = storedDeleted ? JSON.parse(storedDeleted) : [];

            const apiProducts = apiRes.data.products
                .filter(p => !deletedIds.includes(p.id)) // Filter out "deleted" API products
                .map(p => {
                    // Check if there is a local override for this API product
                    const override = myProducts.find(mp => mp.id === p.id);
                    return override ? { ...p, ...override, isMyProduct: true, ownerId: user?.id } : { ...p, isMyProduct: true, ownerId: user?.id };
                });

            // Filter locally created products (only those not overriding API ones)
            const userProducts = myProducts.filter(p => p.ownerId === user?.id && !apiRes.data.products.some(ap => ap.id === p.id));

            // Merge products: Local ones first, then API ones (or overrides)
            setProducts([...userProducts, ...apiProducts]);

            // Fetch users list for future use (store in localStorage)
            const usersRes = await api.get("/users");
            localStorage.setItem("users", JSON.stringify(usersRes.data.users));
        } catch (error) {
            console.error("Error loading data:", error);
            toast.error("Failed to load initial data");
        } finally {
            setLoading(false);
        }
    };

    const saveMyProducts = (updatedMyProducts) => {
        // Persist locally created products with ownerId
        localStorage.setItem("myProducts", JSON.stringify(updatedMyProducts));

        // Re-load to maintain merge with API products
        loadInitialData();
    };

    // Pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData({ ...formData, thumbnail: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setFormData({ title: "", description: "", price: "", category: categories[0] || "", brand: "", stock: "", thumbnail: "" });
        setImagePreview("");
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({ title: product.title, description: product.description, price: product.price, category: product.category, brand: product.brand || "", stock: product.stock, thumbnail: product.thumbnail });
        setImagePreview(product.thumbnail);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const stored = localStorage.getItem("myProducts");
        const myProducts = stored ? JSON.parse(stored) : [];

        if (editingProduct) {
            // Update logic: if it exists in myProducts, update it. If not (API product), add it as override.
            const exists = myProducts.some(p => p.id === editingProduct.id);
            let updatedMyProducts;

            if (exists) {
                updatedMyProducts = myProducts.map((p) =>
                    p.id === editingProduct.id ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) } : p
                );
            } else {
                updatedMyProducts = [{ ...editingProduct, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock), ownerId: user?.id }, ...myProducts];
            }

            saveMyProducts(updatedMyProducts);
            toast.success("Product updated successfully!");
        } else {
            const newProduct = {
                id: `my-${Date.now()}`,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                rating: 0,
                isMyProduct: true,
                ownerId: user?.id,
                images: [formData.thumbnail || ""],
                createdAt: new Date().toISOString()
            };
            saveMyProducts([newProduct, ...myProducts]);
            toast.success("Product created successfully!");
        }
        setShowModal(false);
    };

    const handleDelete = (product) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const isApiProduct = typeof product.id === 'number';

            if (isApiProduct) {
                // Store in deletedProducts for API products
                const storedDeleted = localStorage.getItem("deletedProducts");
                const deletedIds = storedDeleted ? JSON.parse(storedDeleted) : [];
                localStorage.setItem("deletedProducts", JSON.stringify([...deletedIds, product.id]));

                // Also remove any local override
                const stored = localStorage.getItem("myProducts");
                const myProducts = stored ? JSON.parse(stored) : [];
                localStorage.setItem("myProducts", JSON.stringify(myProducts.filter(p => p.id !== product.id)));

                toast.success("API product hidden from dashboard");
            } else {
                // Normal local product deletion
                const stored = localStorage.getItem("myProducts");
                const myProducts = stored ? JSON.parse(stored) : [];
                const updatedMyProducts = myProducts.filter((p) => p.id !== product.id);
                localStorage.setItem("myProducts", JSON.stringify(updatedMyProducts));
                toast.success("Product deleted successfully!");
            }
            loadInitialData();
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: "calc(100vh - 70px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: "60px", height: "60px", border: "5px solid #e5e7eb", borderTop: "5px solid #1f2937", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
                    <p style={{ color: "#6b7280", fontSize: "18px" }}>Loading your products...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "calc(100vh - 70px)", background: "#f9fafb" }}>

            {/* Welcome Hero Section */}
            <div style={{
                background: "none",
                padding: "40px 20px",
                color: "black",
                position: "relative",
                overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"rgba(255,255,255,0.05)\"/></svg>')",
                    backgroundSize: "200px 200px",
                    opacity: 0.5
                }} />
                <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "12px" }}>
                        <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>Welcome, {user?.firstName || user?.username}</h2>
                        <p style={{ marginTop: "8px", opacity: 0.9, fontSize: "16px" }}>Your product dashboard</p>
                    </div>
                    <p style={{ margin: "15px 0 0 0", fontSize: "14px", opacity: 0.85, maxWidth: "600px", lineHeight: 1.6 }}>
                        Manage your products, track inventory, and grow your business. Create new products or browse through your catalog below.
                    </p>
                    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", padding: "15px 25px", borderRadius: "12px" }}>
                            <div style={{ fontSize: "24px", fontWeight: "800" }}>{products.length}</div>
                            <div style={{ fontSize: "12px", opacity: 0.9 }}>Total Products</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "25px 20px" }}>
                {/* Create Button */}
                <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                    <button onClick={openCreateModal} style={{ padding: "14px 28px", background: "black", color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.5)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.4)"; }}>
                        <span style={{ fontSize: "18px" }}>+</span> Create New Product
                    </button>
                    <div style={{ background: "white", padding: "10px 20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                        <span style={{ color: "#6b7280", fontSize: "14px" }}>Showing </span>
                        <strong style={{ color: "#1f2937" }}>{products.length}</strong>
                        <span style={{ color: "#6b7280", fontSize: "14px" }}> products</span>
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "16px" }}>
                        <div style={{ fontSize: "48px", marginBottom: "15px" }}>No products yet.</div>
                        <p style={{ fontSize: "18px", color: "#6b7280" }}>Create your first product!</p>
                    </div>
                ) : (
                    <>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                            {currentProducts.map((product) => (
                                <div key={product.id} style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: product.isMyProduct ? "2px solid #10b981" : "2px solid transparent", position: "relative" }}>
                                    {product.isMyProduct && (
                                        <div style={{ position: "absolute", top: "10px", right: "10px", background: "#10b981", color: "white", padding: "4px 10px", borderRadius: "15px", fontSize: "11px", fontWeight: "600", zIndex: 10 }}>My Product</div>
                                    )}
                                    <div style={{ width: "100%", height: "180px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                        {product.thumbnail ? (
                                            <img src={product.thumbnail} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        ) : (
                                            <span style={{ fontSize: "40px" }}>No Image</span>
                                        )}
                                    </div>
                                    <div style={{ padding: "15px" }}>
                                        <h3 style={{ margin: "0 0 6px 0", fontSize: "16px", color: "#111827", fontWeight: "600" }}>{product.title}</h3>
                                        <p style={{ margin: "0 0 10px 0", fontSize: "11px", color: "#1f2937", fontWeight: "600", textTransform: "uppercase" }}>{product.category || "Uncategorized"}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                            <div style={{ fontSize: "20px", fontWeight: "800", color: "#1f2937" }}>${product.price}</div>
                                            <div style={{ fontSize: "14px", fontWeight: "700", color: product.stock > 10 ? "#10b981" : "#ef4444" }}>{product.stock} in stock</div>
                                        </div>
                                        {product.isMyProduct && (
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    style={{
                                                        flex: 1,
                                                        padding: "10px",
                                                        background: "#f3f4f6",
                                                        color: "#1f2937",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s"
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = "#e5e7eb"}
                                                    onMouseLeave={(e) => e.target.style.background = "#f3f4f6"}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    style={{
                                                        flex: 1,
                                                        padding: "10px",
                                                        background: "#fee2e2",
                                                        color: "#991b1b",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s"
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = "#fecaca"}
                                                    onMouseLeave={(e) => e.target.style.background = "#fee2e2"}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "25px" }}>
                                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ padding: "8px 16px", background: currentPage === 1 ? "#e5e7eb" : "#1f2937", color: currentPage === 1 ? "#9ca3af" : "white", border: "none", borderRadius: "6px", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "600" }}>Previous</button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button key={index + 1} onClick={() => goToPage(index + 1)} style={{ padding: "8px 12px", background: currentPage === index + 1 ? "#1f2937" : "white", color: currentPage === index + 1 ? "white" : "#1f2937", border: currentPage === index + 1 ? "none" : "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>{index + 1}</button>
                                ))}
                                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: "8px 16px", background: currentPage === totalPages ? "#e5e7eb" : "#1f2937", color: currentPage === totalPages ? "#9ca3af" : "white", border: "none", borderRadius: "6px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "600" }}>Next</button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div style={{ background: "white", borderRadius: "16px", padding: "28px", maxWidth: "550px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
                        <h2 style={{ margin: "0 0 20px 0", fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>{editingProduct ? "Edit Product" : "Create New Product"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Enter product name" style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} onFocus={(e) => e.target.style.borderColor = "#1f2937"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Description *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="2" placeholder="Describe your product" style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} onFocus={(e) => e.target.style.borderColor = "#1f2937"} onBlur={(e) => e.target.style.borderColor = "#e5e7eb"} />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Price ($) *</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" placeholder="0.00" style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Stock *</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" placeholder="0" style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Category *</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", background: "white" }}>
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}</option>))}
                                </select>
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Brand</label>
                                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Optional" style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }} />
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151", fontSize: "13px" }}>Product Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: "100%", padding: "10px", border: "2px dashed #e5e7eb", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box", cursor: "pointer", background: "#f9fafb" }} />
                                {imagePreview && (<div style={{ marginTop: "12px", textAlign: "center" }}><img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }} /></div>)}
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button type="submit" style={{ flex: 1, padding: "12px", background: "#1f2937", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>{editingProduct ? "Update" : "Create"}</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", background: "#6b7280", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;