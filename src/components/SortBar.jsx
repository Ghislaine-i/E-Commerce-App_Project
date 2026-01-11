const SortBar = ({ category, setCategory, sort, setSort }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">Category</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="default">Default</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
      </select>
    </div>
  );
};

export default SortBar;
