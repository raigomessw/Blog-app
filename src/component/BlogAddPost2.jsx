import React, { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const BlogAddPost2 = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addBlogPost } = useContext(BlogContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addBlogPost({ id: Date.now(), title, author: "John Doe", content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default BlogAddPost2;
