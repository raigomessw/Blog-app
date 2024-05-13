import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';

const BlogPost = (props) => {
  const { post, addComment } = useContext(BlogContext);

  const [newComment, setNewComment] = useState('');
  const [currentPost, setCurrentPost] = useState(props.post);

  useEffect(() => {
    setCurrentPost(props.post);
  }, [props.post]);
  console.log("Current:",currentPost);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: new Date().getTime(),
        text: newComment,
        author: 'Anonymous',
      };

      addComment(currentPost.id, newCommentObj);
      setNewComment('');
    }
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.text}</p>
      <p>Author: {currentPost.author}</p>
      <ul>
        {currentPost.comments.map((comment) => (
          <li key={comment.id}>
            {comment.text} - {comment.author}
          </li>
        ))}
      </ul>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default BlogPost;