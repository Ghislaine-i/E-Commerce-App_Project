import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const addProduct = async () => {
    await api.post("/products/add", {
      title: "New Product",
      price: 100,
    });

    alert("Product created (simulation)");
  };

  const updateProduct = async () => {
    await api.put("/products/1", {
      price: 200,
    });

    alert("Product updated (simulation)");
  };

  const deleteProduct = async () => {
    await api.delete("/products/1");
    alert("Product deleted (simulation)");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}</p>

      <button onClick={addProduct}>Create Product</button>
      <button onClick={updateProduct}>Update Product</button>
      <button onClick={deleteProduct}>Delete Product</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
