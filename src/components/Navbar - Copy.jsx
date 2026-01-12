import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ background: "#111", padding: "15px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "24px" }}>
        E-Commerce
      </Link>

      <div>
        <Link to="/cart" style={{ color: "#fff", marginRight: "20px" }}>
          Cart ({cart.length})
        </Link>
        <Link to="/wishlist" style={{ color: "#fff", marginRight: "20px" }}>
          Wishlist ({wishlist.length})
        </Link>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} style={{ marginLeft: "20px", background: "red", color: "#fff", border: "none", padding: "5px 10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>
            <Link to="/signup" style={{ color: "#fff" }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
