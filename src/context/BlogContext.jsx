import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  console.log('BlogProvider component rendered');

  const addPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const addComment = (postId, newComment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, addComment }}>
    {console.log('BlogProvider component rendered with blogPosts:', blogPosts)}
    {children}
  </BlogContext.Provider>
  );
};