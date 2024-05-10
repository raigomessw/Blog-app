import { useState } from 'react'
import NavBar from './component/NavBar'
import Home from './page/Home'
import './App.css'
import PageLayout from "./component/PageLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BlogProvider>
      <BrowserRouter>
        <NavBar />
        {isLoggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </>
        ) : (
          <PageLayout>Please log in</PageLayout>
        )}
      </BrowserRouter>
    </BlogProvider>
  )
}

export default App
