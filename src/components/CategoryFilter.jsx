import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", fontSize: "13px" }}>
                Category
            </label>
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    background: "white",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#1f2937"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
            >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.slug || cat} value={cat.slug || cat}>
                        {cat.name || (cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '))}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;