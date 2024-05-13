import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { UserContext } from '../context/UserContext';

const BlogPost = ({ post, onDelete, onEdit }) => { 
 const { blogPosts, addComment, editPost } = useContext(BlogContext);
  const { userName } = useContext(UserContext);

  const [newComment, setNewComment] = useState('');
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditingText, setIsEditingText] = useState(false); // Estado para controlar se o texto do post está sendo editado
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Estado para controlar se o título do post está sendo editado
  const [editedText, setEditedText] = useState(post.text); // Estado para armazenar o texto editado do post
  const [editedTitle, setEditedTitle] = useState(post.title); // Estado para armazenar o título editado do post



  useEffect(() => {
   setCurrentPost(post);
   setEditedText(post.text);
   setEditedTitle(post.title);
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

  const handleEditPost = () => {
   // Verificar se o autor do post é o mesmo que o usuário logado
   if (currentPost.author === userName) {
     setIsEditingText(true);
     setIsEditingTitle(true);
   } else {
     console.log("Você não tem permissão para editar este post.");
   }
 };
 const handleSaveEdit = () => {
  // Atualizar o post com o texto e título editados
  const updatedPost = { ...currentPost, text: editedText, title: editedTitle };
  editPost(currentPost.id, updatedPost);
  setIsEditingText(false);
  setIsEditingTitle(false);
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
     {isEditingTitle ? (
       <input
         value={editedTitle}
         onChange={(e) => setEditedTitle(e.target.value)}
       />
     ) : (
       <h2>{currentPost.title}</h2>
     )}
     {isEditingText ? (
       <textarea
         value={editedText}
         onChange={(e) => setEditedText(e.target.value)}
       />
     ) : (
       <p>{currentPost.text}</p>
     )}
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
         {isEditingText || isEditingTitle ? (
           <button onClick={handleSaveEdit}>Save</button>
         ) : (
           <button onClick={handleEditPost}>Edit</button>
         )}
         <button onClick={handleDeletePost}>Delete</button>
       </>
     )}
   </div>
 );
};
export default BlogPost;
