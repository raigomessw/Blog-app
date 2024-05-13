import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      onAddComment({ id: Date.now(), text: newComment, author: 'Anonymous' });
      setNewComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;