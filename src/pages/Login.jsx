import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(data);
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <input type="password" placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
