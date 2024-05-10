import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <p>
        {comment.text} - {comment.author}
      </p>
    </div>
  );
};

export default Comment;