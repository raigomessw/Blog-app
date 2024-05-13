import React, { useContext } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { UserContext } from '../context/UserContext';

const BlogPost = ({ post, addComment }) => {
  const { userName, isLoggedIn } = useContext(UserContext);

  const handleAddComment = (newComment) => {
    addComment(post.id, newComment);
  };

  return (
    <div className=" shadow-md p-4 rounded">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.text}</p>
      <p className="text-gray-600 mb-2">Author: {post.author}</p>
      {isLoggedIn && (
        <CommentForm onAddComment={handleAddComment} />
      )}
      <h3 className="text-xl font-bold mb-2 mt-6">Comments</h3>
      {post.comments && post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default BlogPost;