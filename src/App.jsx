import NavBar from "./component/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import PageLayout from "./component/PageLayout";
import { BlogProvider } from "./context/BlogContext";
import HomePage from './component/Home';
import NewPostPage from './page/NewPostPage';
import LoginComponent from "./component/LoginComponent";
import RegisterComponent from "./component/RegisterComponent";
import PrivateRoutes from "./component/PrivateRoutes";

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
<BlogProvider >
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
      path="/"
      element={
        <PageLayout>
          <h1>I am a public page</h1>
        </PageLayout>
      }
    />
  </Routes>
</BrowserRouter>
</BlogProvider>
  );
};

export default App;
