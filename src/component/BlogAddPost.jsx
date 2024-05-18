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
    <div className="max-w-md mx-auto p-4 rounded shadow-lg bg-gray-500">
  <h2 className="text-xl font-bold mb-4">New Post</h2>
  <input 
    className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
    value={title} 
    onChange={(e) => setTitle(e.target.value)} 
    placeholder="Title" 
  />
  <textarea 
    className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
    value={text} 
    onChange={(e) => setText(e.target.value)} 
    placeholder="Text" 
    rows="4"
  />
  <select 
    className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
    value={category} 
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select Category</option>
    {categories.map((cat, index) => (
      <option key={index} value={cat}>{cat}</option>
    ))}
  </select>
  <div className="flex justify-end space-x-2">
    <button 
      className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-black focus:outline-none focus:bg-blue-600 w-full"
      onClick={handleSave}
    >
      Save
    </button>
    {isEditing && (
      <>
        <button 
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </>
    )}
  </div>
</div>

  );
};

export default BlogAddPost;