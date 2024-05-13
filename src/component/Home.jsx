import React, { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogPost from './BlogPost';

const Home = () => {
 const { blogPosts, deletePost, editPost } = useContext(BlogContext);

 if (!blogPosts) {
  return <div>Loading...</div>;
}

if (Array.isArray(blogPosts) && blogPosts.length === 0) {
 return <div>No posts found.</div>;
}

  return (
    <div>
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} onDelete={deletePost} onEdit={editPost} />
      ))}
    </div>
  );
};

export default Home;
