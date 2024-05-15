import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';

const BlogAddPost = ({ addComment }) => {
  const { currentUser } = useContext(AuthContext); 
  const { addPost } = useContext(BlogContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');


  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      console.log("Title and text cannot be empty");
      return;
    }

    const newPost = {
      id: new Date().getTime(),
      title,
      text,
      author: currentUser.email, // Usar o email do usuário autenticado
      authorId: currentUser.uid, // Usar o uid do usuário autenticado
      comments: [],
    };

    addPost(newPost);
    setTitle('');
    setText('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
    setText('');
  };

  return (
    <div>
      <h2>New Post</h2>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Text" 
      />
      <button onClick={handleSave}>Save</button>
      {isEditing && (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default BlogAddPost;