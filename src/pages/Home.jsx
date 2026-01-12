import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const { products, categories, fetchProducts, loading, error } = useContext(ProductContext);
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        fetchProducts(category, sortBy, sortOrder);
    }, [category, sortBy, sortOrder]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [category, sortBy, sortOrder, searchQuery]);

    const safeProducts = Array.isArray(products) ? products : [];
    const filteredProducts = searchQuery
        ? safeProducts.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : safeProducts;

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 70px)",
            display: "flex",
            flexDirection: "column",
            background: "#f9fafb"
        }}>
            {/* Hero/Intro Section */}
            <div style={{
                background: "white",
                padding: "50px 20px",
                color: "black",
                position: "relative",
                overflow: "hidden",
                marginBottom: "25px"
            }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                }} />
                <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                        <span style={{ fontSize: "48px" }}>🛒</span>
                        <div>
                            <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "800" }}>
                                Welcome to Our Store
                            </h1>
                            <p style={{ margin: "8px 0 0 0", fontSize: "18px", opacity: 0.9 }}>
                                Discover amazing products at unbeatable prices
                            </p>
                        </div>
                    </div>
                    <p style={{ margin: "20px 0 0 0", fontSize: "15px", opacity: 0.85, maxWidth: "700px", lineHeight: 1.7 }}>
                        Browse through our curated collection of premium products. From electronics to fashion,
                        we have everything you need. Use the filters below to find exactly what you're looking for!
                    </p>
                    <div style={{ display: "flex", gap: "15px", marginTop: "25px", flexWrap: "wrap" }}>
                        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", padding: "12px 20px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "20px" }}>📦</span>
                            <span style={{ fontWeight: "600" }}>{filteredProducts.length} Products</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", padding: "12px 20px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "20px" }}>🏷️</span>
                            <span style={{ fontWeight: "600" }}>{categories.length} Categories</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", padding: "12px 20px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "20px" }}>🚚</span>
                            <span style={{ fontWeight: "600" }}>Free Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: "0 20px", maxWidth: "1400px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
                {/* Filters Section */}
                <div
                    style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: "12px",
                        }}
                    >
                        {/* Search */}
                        <div>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px" }}>
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                }}
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px" }}>
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                }}
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px" }}>
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                }}
                            >
                                <option value="">Default</option>
                                <option value="price">Price</option>
                                <option value="title">Name</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px" }}>
                                Order
                            </label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                }}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "50px", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <div
                            style={{
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid #1f2937",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                        <p style={{ marginTop: "20px", color: "#666" }}>Loading products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div
                        style={{
                            background: "#fee",
                            border: "1px solid #fcc",
                            color: "#c33",
                            padding: "15px",
                            borderRadius: "5px",
                            marginBottom: "20px",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div style={{ textAlign: "center", padding: "50px", color: "#666", flex: 1 }}>
                        <p style={{ fontSize: "18px" }}>No products found</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && currentProducts.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                                gap: "20px",
                            }}
                        >
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                marginTop: "30px",
                                paddingBottom: "20px"
                            }}>
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: "8px 16px",
                                        background: currentPage === 1 ? "#e5e7eb" : "#1f2937",
                                        color: currentPage === 1 ? "#9ca3af" : "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                    }}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => goToPage(index + 1)}
                                        style={{
                                            padding: "8px 14px",
                                            background: currentPage === index + 1 ? "#1f2937" : "white",
                                            color: currentPage === index + 1 ? "white" : "#1f2937",
                                            border: currentPage === index + 1 ? "none" : "1px solid #d1d5db",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: "8px 16px",
                                        background: currentPage === totalPages ? "#e5e7eb" : "#1f2937",
                                        color: currentPage === totalPages ? "#9ca3af" : "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* Products count */}
                        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px", marginTop: "10px" }}>
                            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                        </p>
                    </div>
                )}

                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Home;