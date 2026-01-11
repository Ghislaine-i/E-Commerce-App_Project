import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import SortBar from "../components/SortBar";

const Home = () => {
  const { products, fetchProducts, loading } = useContext(ProductContext);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts(category, sort);
  }, [category, sort]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <SortBar
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && <p>No products found</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
