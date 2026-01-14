import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem("products");
        return storedProducts ? JSON.parse(storedProducts) : [];
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);
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

            if (category !== "all") {
                url = `/products/category/${category}`;
            }

            if (sortBy && sortOrder) {
                url += `${url.includes("?") ? "&" : "?"}sortBy=${sortBy}&order=${sortOrder}`;
            }

            const response = await api.get(url);
            const apiProducts = response.data.products || [];

            // Get local storage data
            const storedMyProducts = localStorage.getItem("myProducts");
            const myProducts = storedMyProducts ? JSON.parse(storedMyProducts) : [];

            const storedDeleted = localStorage.getItem("deletedProducts");
            const deletedIds = storedDeleted ? JSON.parse(storedDeleted) : [];

            // Filter API products to remove those marked as "deleted"
            const filteredApiProducts = apiProducts
                .filter(p => !deletedIds.includes(p.id))
                .map(p => {
                    // Apply overrides if any
                    const override = myProducts.find(mp => mp.id === p.id);
                    return override ? { ...p, ...override } : p;
                });

            // Get local products only (those that aren't overrides)
            const filteredMyProducts = category === "all"
                ? myProducts.filter(p => !apiProducts.some(ap => ap.id === p.id))
                : myProducts.filter(p => p.category === category && !apiProducts.some(ap => ap.id === p.id));

            // Merge products
            setProducts([...filteredMyProducts, ...filteredApiProducts]);
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