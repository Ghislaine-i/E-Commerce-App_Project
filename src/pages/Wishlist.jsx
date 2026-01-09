import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your wishlist is empty</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wishlist</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {wishlist.map(item => (
          <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <img src={item.thumbnail} width="100%" />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeFromWishlist(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
