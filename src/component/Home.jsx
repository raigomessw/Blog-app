import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import BlogPost from './BlogPost';

const Home = () => {
  const { blogPosts } = useContext(UserContext);

  return (
    <div>
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

export default Home;