import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import NavBar from './component/NavBar';
import HomePage from './page/HomePage';
import NewPostPage from './page/NewPostPage';
import Login from './component/Login';
import PageLayout from './component/PageLayout';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-post-page" element={<NewPostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<PageLayout>You have been logged out.</PageLayout>} />
          <Route path="*" element={<PageLayout>Page not found.</PageLayout>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
