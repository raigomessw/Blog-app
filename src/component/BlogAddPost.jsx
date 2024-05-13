import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BlogContext } from '../context/BlogContext';

const BlogAddPost = ({ addComment }) => {
  const { userName } = useContext(UserContext);
  const { blogPosts, addPost } = useContext(BlogContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newPost = {
      id: new Date().getTime(),
      title,
      text,
      author: userName,
      comments: [],
    };

    console.log(newPost);

    addPost(newPost);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: new Date().getTime(),
        text: newComment,
        author: 'Anonymous',
      };

      addComment(blogPosts[blogPosts.length - 1].id, newCommentObj);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>New Post</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" />
      <button onClick={handleSave}>Save</button>
      {isEditing && (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default BlogAddPost;