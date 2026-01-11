import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { addProduct, updateProduct, deleteProduct } = useContext(ProductContext);

  const handleAddProduct = async () => {
    await addProduct({
      title: "New Product",
      price: 100,
    });
    alert("Product created");
  };

  const handleUpdateProduct = async () => {
    await updateProduct(1, {
      price: 200,
    });
    alert("Product updated");
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(1);
    alert("Product deleted");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}</p>

      <button onClick={handleAddProduct}>Create Product</button>
      <button onClick={handleUpdateProduct}>Update Product</button>
      <button onClick={handleDeleteProduct}>Delete Product</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
