import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="mb-2">
      <p>
        {comment.text} - {comment.author}
      </p>
    </div>
  );
};

export default Comment;
