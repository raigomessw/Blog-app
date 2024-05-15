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
   <div>
   <select value={selectedCategory} onChange={handleCategoryChange}>
     <option value="">All Categories</option>
     {categories.map((category, index) => (
       <option key={index} value={category}>{category}</option>
     ))}
   </select>
   <div>
     {filteredPosts.map((post) => (
       <BlogPost key={post.id} post={post} onDelete={deletePost} onEdit={editPost} />
     ))}
   </div>
 </div>
  );
};

export default Home;
