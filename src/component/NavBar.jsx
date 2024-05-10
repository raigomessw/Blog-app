import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="grid grid-cols-2 mt-2 mx-10 items-center bg-slate-400 w-5/5 border-spacing-5">
      <h1 className="font-bold">Blog App</h1>

      <nav className="flex justify-end">
        <Link to="/" exact className="mr-4" key="home">
          Home
        </Link>
        <Link to="/new-post-page" className="mr-4">
          New Post
        </Link>

        {user ? ( 
          <Link to="/login" className="mr-4">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="mr-4">
            Login
          </Link>
        )} 
      </nav>
    </div>
  );
};

export default NavBar;