import React, { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogPost from './BlogPost';
import CommentForm from './CommentForm';

const Home = () => {
  const { blogPost, addComment } = useContext(BlogContext);

  return (
    <div className="grid grid-cols-1 mx-4 my-2 lg:mx-14 lg:my-6 gap-4 bg-slate-600">
      <h1>Blog Posts</h1>
      {blogPost && blogPost.map((post) => (
        <BlogPost key={post.id} post={post} addComment={addComment} />
      ))}
    </div>
  );
};

export default Home;