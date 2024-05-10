import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
 const { userName } = useContext(UserContext);

 return (
   <div className="grid grid-cols-2 mt-2 mx-10 items-center bg-slate-400 w-5/5 border-spacing-5">
     <h1 className="font-bold">Blog App</h1>

     <nav className="flex justify-end">
       <Link to="/" className="mr-4">
         Home
       </Link>
       <Link className="mr-4" to="/about">
         About
       </Link>
       <Link to="/products">Products</Link>
       <p className="ml-5">{userName}</p>
     </nav>
   </div>
 );
};
 
export default NavBar;