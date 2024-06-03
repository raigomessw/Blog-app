import React, { useContext } from "react";
import NavBar from "./component/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider, UserContext } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";
import HomePage from './component/Home';
import NewPostPage from './page/NewPostPage';
import LoginComponent from "./component/LoginComponent";
import RegisterComponent from "./component/RegisterComponent";
import PrivateRoutes from "./component/PrivateRoutes";
import PageLayout from "./component/PageLayout";

const App = () => {

  return (
    <UserProvider>
      <BlogProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/new-post-page" element={<NewPostPage />} />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/public"
              element={
                <PageLayout>
                  <h1>I am a public page</h1>
                </PageLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </UserProvider>
  );
};

export default App;
