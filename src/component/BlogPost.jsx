// blog-post.js
import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const BlogPost = ({ post }) => {
  const { user, blogPosts, setBlogPosts } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedPost = { ...post, title, text };
    setBlogPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
  };

  const handleDelete = () => {
    setBlogPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  };

  return (
    <div>
      <h2>{isEditing ? <input value={title} onChange={(e) => setTitle(e.target.value)} /> : post.title}</h2>
      <p>Author: {post.author}</p>
      {isEditing ? (
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <p>{post.text}</p>
      )}
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {user.name === post.author && (
        <div>
          {isEditing ? (
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogPost;