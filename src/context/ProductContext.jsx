import { createContext, useState } from "react";
import api from "../api/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (category = "all", sort = "default") => {
    setLoading(true);

    try {
      let url = "/products";

      if (category !== "all") {
        url = `/products/category/${category}`;
      }

      const res = await api.get(url);
      let data = res.data.products;

      if (sort === "price-low") {
        data = [...data].sort((a, b) => a.price - b.price);
      }

      if (sort === "price-high") {
        data = [...data].sort((a, b) => b.price - a.price);
      }

      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const res = await api.post("/products/add", product);
      setProducts(prev => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await api.put(`/products/${id}`, updates);
      setProducts(prev => prev.map(p => p.id === id ? res.data : p));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
