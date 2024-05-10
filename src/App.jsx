import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import NavBar from './component/NavBar';
import HomePage from './page/HomePage';
import NewPostPage from './page/NewPostPage';

const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <UserProvider>
    <BrowserRouter>
        <NavBar />
        {isLoggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-post-page" element={<NewPostPage />} />
            </Routes>
          </>
        ) : (
          <PageLayout>Please log in</PageLayout>
        )}
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;