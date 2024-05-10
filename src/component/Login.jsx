import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser({ name: "John Doe" });
  };

  return (
    <div className="flex justify-center">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;