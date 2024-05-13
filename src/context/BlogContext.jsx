import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 123,
      title: 'My First Blog Post',
      text: 'This is my first blog post.',
      author: 'John Doe',
      comments: [
        {
          id: 1,
          text: 'Great post!',
          author: 'Jane Doe',
        },
      ],
    },
  ]);

  const addComment = (postId, newComment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <BlogContext.Provider value={{ blogPost: blogPosts, addComment }}>
      {props.children}
    </BlogContext.Provider>
  );
};