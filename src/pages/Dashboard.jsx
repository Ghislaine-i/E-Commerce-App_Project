import api from "../api/axios";

const Dashboard = () => {
  const createProduct = async () => {
    await api.post("/products/add", {
      title: "Demo Product",
      price: 200
    });
    alert("Product Created (Simulation)");
  };

  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={createProduct}>Create Product</button>
    </>
  );
};

export default Dashboard;
