import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginComponent2 = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent2;
