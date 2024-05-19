import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const BlogPost = ({ post, onDelete }) => {
  const { addComment, editPost, categories, deleteComment, editComment } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState('');
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedCategory, setEditedCategory] = useState(post.category);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

  useEffect(() => {
    setCurrentPost(post);
    setEditedText(post.text);
    setEditedTitle(post.title);
    setEditedCategory(post.category);
  }, [post]);

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return;
    }

    const newCommentObj = {
      id: new Date().getTime(),
      text: newComment,
      author: currentUser.email,
    };

    addComment(currentPost.id, newCommentObj);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(currentPost.id, commentId);
  };
  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);
  };

  const handleSaveEditedComment = () => {
    editComment(currentPost.id, editingCommentId, editedCommentText);
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleEditPost = () => {
    if (currentPost.authorId === currentUser.uid) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    const updatedPost = { ...currentPost, text: editedText, title: editedTitle, category: editedCategory };
    editPost(currentPost.id, updatedPost);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(post.text);
    setEditedTitle(post.title);
    setEditedCategory(post.category);
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    if (currentPost.authorId === currentUser.uid) {
      onDelete(currentPost.id);
    }
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  const authorDisplay = <p className="font-light text-base mb-1">Author: {currentPost.author}</p>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-700 rounded shadow-lg space-y-4">
      {isEditing ? (
        <div>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mb-3"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mb-3"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Text"
            rows="4"
          />
          <select
            className="w-full border bg-gray-700 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mb-3"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-3"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="w-full px-4 py-2 bg-blue-200 text-black rounded">
            <p className="mb-2">Category: {currentPost.category}</p>
            {authorDisplay}
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentPost.title}</h2>
          <p className="mb-4">{currentPost.text}</p>
        </div>
      )}
      <ul className="mb-4">
        {currentPost.comments.map((comment) => (
          <li key={comment.id} className="mb-2 flex justify-between items-center">
            <div>
              <span className="font-bold">Author:</span> {comment.author}
              <br />
              <span className="font-bold">Comment:</span> 
              {editingCommentId === comment.id ? (
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              ) : (
                <span>{comment.text}</span>
              )}
            </div>
            {comment.author === currentUser.email && (
              <div className="flex">
                {editingCommentId === comment.id ? (
                  <>
                    <button
                      className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      onClick={handleSaveEditedComment}
                    >
                      Save
                    </button>
                    <button
                      className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      onClick={handleCancelEditComment}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      onClick={() => handleEditComment(comment.id, comment.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mb-3"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleAddComment}
      >
        Add Comment
      </button>
      {currentPost.authorId === currentUser.uid && (
        <>
          {!isEditing && (
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
              onClick={handleEditPost}
            >
              Edit
            </button>
          )}
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 mt-2"
            onClick={handleDeletePost}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BlogPost;
