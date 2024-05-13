import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  console.log('BlogProvider component rendered');

  const [blogPosts, setBlogPosts] = useState([]);

  // Function to add a new post
  const addPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  // Function to delete a post
  const deletePost = (postId) => {
    setBlogPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );
  };

  // Function to edit a post
  const editPost = (postId, updatedPost) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  // Function to add a comment to an existing post
  const addComment = (postId, newComment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  // Function to save blog posts to localStorage
  const savePostsToLocalStorage = () => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  };

  // Load blog posts from localStorage on component mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save blog posts to localStorage before page unload
  useEffect(() => {
    window.addEventListener('beforeunload', savePostsToLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', savePostsToLocalStorage);
    };
  }, [blogPosts]);

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, deletePost, addComment, editPost }}>
      {console.log('BlogProvider component rendered with blogPosts:', blogPosts)}
      {children}
    </BlogContext.Provider>
  );
};
