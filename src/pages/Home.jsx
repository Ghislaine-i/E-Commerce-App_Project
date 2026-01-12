import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const { products, categories, fetchProducts, loading, error } = useContext(ProductContext);
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProducts(category, sortBy, sortOrder);
    }, [category, sortBy, sortOrder]);

    const filteredProducts = searchQuery
        ? products.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

    return (
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#333" }}>
                Products
            </h1>

            {/* Filters Section */}
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "30px",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "15px",
                    }}
                >
                    {/* Search */}
                    <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "14px",
                            }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "14px",
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
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "14px",
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
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                            Order
                        </label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "14px",
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
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <div
                        style={{
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #6366f1",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto",
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
                <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
                    <p style={{ fontSize: "18px" }}>No products found</p>
                </div>
            )}

            {/* Products Grid */}
            {!loading && !error && filteredProducts.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "25px",
                    }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Home;