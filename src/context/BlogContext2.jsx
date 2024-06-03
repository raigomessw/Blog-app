import { createContext, useState, useContext2 } from "react";
import { UserContext2 } from "./UserContext";


export const BlogContext2 = createContext();

export const BlogContext2Provider = (props) => {
  const [blogs, setBlogPosts] = useState([
    { id: 1, title: "Post 1 by Jane Doe", author: "Jane Doe", content: "Hello world" },
    { id: 2, title: "Post 2 by John Smith", author: "John Smith", content: "Hiiii" },
  ]);

  const { userName } = useContext2(UserContext2); 

  const addBlogPost = (newPost) => {
    setBlogPosts([...blogs, newPost]); 
  };

  return (
    <BlogContext2.Provider value={{ blogs, setBlogPosts, addBlogPost }}>
      {props.children}
    </BlogContext2.Provider>
  );
};
