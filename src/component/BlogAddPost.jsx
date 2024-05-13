import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BlogContext } from '../context/BlogContext';

const BlogAddPost = () => {
  const { userName } = useContext(UserContext);
  const { blogPost, setBlogPosts } = useContext(BlogContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newPost = {
      id: new Date().getTime(),
      title,
      text,
      author: userName,
      comments: [],
    };

    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
    <h2>New Post</h2>
    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" />
    <button onClick={handleSave}>Save</button>
  </div>
  );
};

export default BlogAddPost;