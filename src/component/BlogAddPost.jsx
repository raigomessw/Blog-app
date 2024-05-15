import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';

const BlogAddPost = ({ addComment }) => {
  const { currentUser } = useContext(AuthContext); 
  const { addPost, categories, addCategory } = useContext(BlogContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');


  const handleSave = () => {
    console.log('Title:', title);
  console.log('Text:', text);
  console.log('Category:', category);
    if (!title.trim() || !text.trim() || !category.trim()) {
      console.log("Title, text and category cannot be empty");
      return;
    }

    let selectedCategory = category.trim();
  if (!categories.includes(selectedCategory)) {
    addCategory(selectedCategory);
  }

  selectedCategory = category.trim();

    const newPost = {
      id: new Date().getTime(),
      title,
      text,
      author: currentUser.email, // Usar o email do usuário autenticado
      authorId: currentUser.uid,
      category: selectedCategory,
      comments: [],
    };

    addPost(newPost);
    setTitle('');
    setText('');
    setCategory('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
    setText('');
    setCategory('');
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory('');
    }
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={handleSave}>Save</button>
      {isEditing && (
        <>
          <button onClick={handleAddCategory}>Add Category</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default BlogAddPost;