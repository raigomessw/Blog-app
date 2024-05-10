import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import BlogPost from './BlogPost';

const HomePage = () => {
  const { blogPosts } = useContext(UserContext);

  return (
    <div className="grid grid-cols-1 mx-4 my-2 lg:mx-14 lg:my-6 gap-4">
      <h1>Blog Posts</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <BlogPost post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
