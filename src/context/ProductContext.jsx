import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/products/categories");
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const fetchProducts = async (category = "all", sortBy = "", sortOrder = "asc") => {
        setLoading(true);
        setError(null);

        try {
            let url = "/products?limit=100";

            // Apply category filter
            if (category !== "all") {
                url = `/products/category/${category}`;
            }

            // Apply sorting parameters
            if (sortBy && sortOrder) {
                url += `${url.includes("?") ? "&" : "?"}sortBy=${sortBy}&order=${sortOrder}`;
            }

            const response = await api.get(url);
            setProducts(response.data.products || []);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products. Please try again.");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product) => {
        try {
            const response = await api.post("/products/add", product);
            setProducts((prev) => [response.data, ...prev]);
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Error adding product:", err);
            return { success: false, message: "Failed to add product" };
        }
    };

    const updateProduct = async (id, updates) => {
        try {
            const response = await api.put(`/products/${id}`, updates);
            setProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, ...response.data } : p))
            );
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Error updating product:", err);
            return { success: false, message: "Failed to update product" };
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            return { success: true };
        } catch (err) {
            console.error("Error deleting product:", err);
            return { success: false, message: "Failed to delete product" };
        }
    };

    const searchProducts = async (query) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/products/search?q=${query}`);
            setProducts(response.data.products || []);
        } catch (err) {
            console.error("Error searching products:", err);
            setError("Failed to search products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                categories,
                loading,
                error,
                fetchProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                searchProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};