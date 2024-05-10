import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NewPost = () => {
  const { user, setBlogPosts } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      author: user.name,
      text,
      comments: [],
    };
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <div/>
        <label>
          Text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;