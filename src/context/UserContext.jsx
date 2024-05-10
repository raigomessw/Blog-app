import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Rai Gomes' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        blogPosts,
        setBlogPosts,
        setUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
