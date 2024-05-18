import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const BlogPost = ({ post, onDelete }) => { 
  const { addComment, editPost, categories } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState('');
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se o post está sendo editado
  const [editedText, setEditedText] = useState(post.text); // Estado para armazenar o texto editado do post
  const [editedTitle, setEditedTitle] = useState(post.title); // Estado para armazenar o título editado do post
  const [editedCategory, setEditedCategory] = useState(post.category); 

  useEffect(() => {
    setCurrentPost(post);
    setEditedText(post.text);
    setEditedTitle(post.title);
    setEditedCategory(post.category);
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
      author: currentUser.email,
    };

    addComment(currentPost.id, newCommentObj);
    setNewComment('');
  };

  const handleEditPost = () => {
    if (currentPost.authorId === currentUser.uid) {
      setIsEditing(true);
    } else {
      console.log("You do not have permission to edit this post.");
    }
  };

  const handleSaveEdit = () => {
    const updatedPost = { ...currentPost, text: editedText, title: editedTitle , category: editedCategory };
    editPost(currentPost.id, updatedPost);
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    if (currentPost.authorId === currentUser.uid) {
      onDelete(currentPost.id);
    } else {
      console.log("You do not have permission to delete this post.");
    }
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

 const authorDisplay = <p className=" font-light text-base mb-1">Author: {currentPost.author}</p>;
  return (
   <div className="max-w-lg mx-auto p-4 bg-gray-700 rounded shadow-lg space-y-4">
  {isEditing ? (
    <div>
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        placeholder="Text"
        rows="4"
      />
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        value={editedCategory}
        onChange={(e) => setEditedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleSaveEdit}
      >
        Save
      </button>
    </div>
  ) : (
   <div className="mb-4">
  <div className="w-full px-4 py-2 bg-blue-200 text-black rounded ">
  <p className="mb-2">Category: {currentPost.category}</p>
   {authorDisplay}
  </div>
  <div>
    <h2 className="text-2xl font-bold mb-2">{currentPost.title}</h2>
  </div>
  <div>
    <p className="mb-4">{currentPost.text}</p>
  </div>
</div>
  )}
  <ul className="mb-4">
    {currentPost.comments.map((comment) => (
      <li key={comment.id} className="mb-2">
        <span className="font-bold">Author:</span> {comment.author}
        <br />
        <span className="font-bold">Commentar:</span> {comment.text}
      </li>
    ))}
  </ul>
  <input
    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
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
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleEditPost}
        >
          Edit
        </button>
      )}
      <button
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
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
