import { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [commentarius, setComentarius] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ]);

  return (
    <BlogContext.Provider value={{ commentarius}}>
      {props.children}
    </BlogContext.Provider>
  );
};
