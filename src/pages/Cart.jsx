import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  if (!cart.length) return <h2>Cart is empty</h2>;

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>Qty: {item.qty}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
