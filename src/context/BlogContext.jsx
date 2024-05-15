import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["General","IT", "UX/UI" ]);

  const addPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const deletePost = (postId) => {
    setBlogPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== postId)
    );
  };

  const addComment = (postId, newComment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  const editPost = (postId, updatedPost) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? updatedPost : post
      )
    );
  };

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };
  const removeCategory = (category) => { 
    setCategories((prevCategories) => prevCategories.filter((c) => c !== category));
  }
  const savePostsToLocalStorage = () => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    localStorage.setItem('categories', JSON.stringify(categories));
  };

  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', savePostsToLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', savePostsToLocalStorage);
    };
  }, [blogPosts]);

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, deletePost, addComment, editPost, categories, addCategory }}>
      {children}
    </BlogContext.Provider>
  );
};
