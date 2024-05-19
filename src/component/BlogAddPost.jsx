import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';

const BlogAddPost = () => {
  const { currentUser } = useContext(AuthContext); 
  const { addPost, categories, addCategory } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!title.trim() || !text.trim() || !category.trim()) {
      console.log("Title, text and category cannot be empty");
      return;
    }

    let selectedCategory = category.trim();
    if (!categories.includes(selectedCategory)) {
      addCategory(selectedCategory);
    }

    const newPost = {
      id: new Date().getTime(),
      title,
      text,
      author: currentUser.email,
      authorId: currentUser.uid,
      category: selectedCategory,
      comments: [],
    };

    addPost(newPost);
    setTitle('');
    setText('');
    setCategory('');
    navigate('/');
  };

  const handleCancel = () => {
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
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">New Post</h2>
      <select 
        className="w-full border bg-gray-900 border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-4"
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <input 
        className="w-full border bg-gray-900 border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-4"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <textarea 
        className="w-full border bg-gray-900 border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-4"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Text" 
        rows="4"
      />
      <div className="flex justify-end space-x-2">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlogAddPost;
