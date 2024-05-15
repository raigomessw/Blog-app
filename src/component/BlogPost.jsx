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

 const authorDisplay = <p>Author: {currentPost.author}</p>;
  return (
   <div>
     {isEditing ? (
       <>
         <input
           value={editedTitle}
           onChange={(e) => setEditedTitle(e.target.value)}
           placeholder="Title"
         />
         <textarea
           value={editedText}
           onChange={(e) => setEditedText(e.target.value)}
           placeholder="Text"
         />
         <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
           <option value="">Select Category</option>
           {categories.map((cat, index) => (
             <option key={index} value={cat}>{cat}</option>
           ))}
         </select>
         <button onClick={handleSaveEdit}>Save</button>
       </>
     ) : (
       <div>
        <h1>{authorDisplay}</h1>
         <h2>{currentPost.title}</h2>
         <p>{currentPost.text}</p>
         <p>Category: {currentPost.category}</p>
       </div>
     )}
      <ul>
       {currentPost.comments.map((comment) => (
        <li key={comment.id}>
         {["Author:", comment.author]},
         {["Commentar:", comment.text]}
        </li>
       ))}
      </ul>
     <input
       value={newComment}
       onChange={(e) => setNewComment(e.target.value)}
       placeholder="Add a comment"
     />
     <button onClick={handleAddComment}>Add Comment</button>
     {currentPost.authorId === currentUser.uid && (
       <>
         {!isEditing && <button onClick={handleEditPost}>Edit</button>}
         <button onClick={handleDeletePost}>Delete</button>
       </>
     )}
   </div>
 );
};

export default BlogPost;
