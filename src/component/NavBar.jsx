import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <div className="grid grid-cols-2 mx-4 my-2 lg:mx-14 lg:my-6 items-center">
      <h1 className="font-bold">Blog App</h1>

      <nav className=" flex">
        <Link to="/" exact className="mr-4" key="home">
          Home
        </Link>
        <Link to="/new-post-page" className="mr-4" key="new-post-page">
          New Post
        </Link>

        {isLoggedIn ? (
          <Link to="/logout" className="mr-4" key="logout">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="mr-4" key="login">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
