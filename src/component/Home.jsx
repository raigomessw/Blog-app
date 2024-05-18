import React, { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogPost from './BlogPost';

const Home = () => {
 const { blogPosts, deletePost, editPost, categories } = useContext(BlogContext);
 const [selectedCategory, setSelectedCategory] = useState('');

 const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
};

let filteredPosts = blogPosts;
if (selectedCategory) {
  filteredPosts = blogPosts.filter(post => post.category === selectedCategory);
}

 if (!blogPosts) {
  return <div>Loading...</div>;
}

if (Array.isArray(blogPosts) && blogPosts.length === 0) {
 return <div>No posts found.</div>;
}

  return (
   <div className="  w-11/12 mx-auto p-4 bg-gray-800 rounded shadow-xl shadow-slate-900 space-y-4">
  <select
    className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
    value={selectedCategory}
    onChange={handleCategoryChange}
  >
    <option value="">All Categories</option>
    {categories.map((category, index) => (
      <option key={index} value={category}>{category}</option>
    ))}
  </select>
  <div className='space-y-5'>
    {filteredPosts.map((post) => (
      <BlogPost key={post.id} post={post} onDelete={deletePost} onEdit={editPost} />
    ))}
  </div>
</div>
  );
};

export default Home;
