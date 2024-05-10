import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NewPost = () => {
  const { user, setBlogPosts } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleSubmit = async (e) => { // Use async for potential future API calls
    e.preventDefault();

    // Basic validation
    if (!title || !text) {
      setErrorMessage('Please fill in both title and text fields.');
      return; // Early exit if validation fails
    }

    const newPost = {
      id: Date.now(),
      title,
      author: user.name,
      text,
      comments: [],
    };

    try {
      // Logic for creating the post (could involve API calls)
      // Assuming a successful creation, update state and clear error message
      setBlogPosts((prevPosts) => [...prevPosts, newPost]);
      setTitle('');
      setText('');
      setErrorMessage(null);
    } catch (error) {
      // Handle errors appropriately, e.g., display an error message
      setErrorMessage('There was an error creating the post. Please try again.');
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
