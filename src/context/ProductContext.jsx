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

  return (
    <ProductContext.Provider value={{ products, fetchProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
