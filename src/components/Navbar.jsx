import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav style={{ background: "#111", padding: "15px", color: "#fff", display: "flex", justifyContent: "space-between" }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        E-Commerce
      </Link>

      <Link to="/cart" style={{ color: "#fff" }}>
        Cart ({cart.length})
      </Link>
    </nav>
  );
};

export default Navbar;
