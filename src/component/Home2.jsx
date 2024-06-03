import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const HomePage2 = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-post">
          <h2>{blog.title}</h2>
          <p>Författare: {blog.author}</p>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage2;
