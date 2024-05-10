import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const handleLogin = () => {
    setUser({ name: 'John Doe' });
    setIsLoggedIn(true);
  };

  return (
    <PageLayout>
      <div className="flex justify-center">
        <button onClick={handleLogin}>Login</button>
      </div>
      <Link to="/">Back to Home</Link>
    </PageLayout>
  );
};

export default Login;
