import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img src={product.thumbnail} width="100%" alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button onClick={() => addToWishlist(product)} style={{ marginLeft: "10px" }}>
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;
