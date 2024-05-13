import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { UserContext } from '../context/UserContext';

const BlogPost = ({ post, onDelete }) => { // Certifique-se de que onDelete está sendo recebido como uma propriedade
  const { blogPosts, addComment } = useContext(BlogContext);
  const { userName } = useContext(UserContext);

  const [newComment, setNewComment] = useState('');
  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  const handleAddComment = () => {
    if (!currentPost) {
      console.error('BlogPost.handleAddComment: currentPost is null');
      return;
    }

    if (!addComment) {
      console.error('BlogPost.handleAddComment: addComment is null');
      return;
    }

    if (newComment.trim() === '') {
      console.error('BlogPost.handleAddComment: newComment is empty');
      return;
    }
    
    const newCommentObj = {
      id: new Date().getTime(),
      text: newComment,
      author: userName,
    };

    addComment(currentPost.id, newCommentObj);
    setNewComment('');
  };

  const handleEdit = () => {
    // Lógica para edição do post
  };

  const handleDeletePost = () => {
    if (currentPost.author === userName) {
      onDelete(currentPost.id); 
    } else {
      console.log("Você não tem permissão para excluir este post.");
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
      {currentPost.author === userName && (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDeletePost}>Delete</button>
        </>
      )}
    </div>
  );
};

export default BlogPost;
