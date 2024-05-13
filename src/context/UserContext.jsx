import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userName, setUserName] = useState("Rai Gomes");
  const lsIsLoggedIn = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(lsIsLoggedIn);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Post 1',
      author: 'Jane Doe',
      text: 'This is post 1',
      comments: [],
    },
    {
      id: 2,
      title: 'Post 2',
      author: 'Jane Doe',
      text: 'This is post 2',
      comments: [],
    },
  ]);

  const useInApp = {
    userName,
    setUserName,
    isLoggedIn,
    blogPosts,
    setBlogPosts,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={useInApp}>
      {props.children}
    </UserContext.Provider>
  );
};
