import NavBar from "./component/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import PageLayout from "./component/PageLayout";
import { ProductProvider } from "./context/ProductContext";
import HomePage from './component/Home';
import NewPostPage from './page/NewPostPage';

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <ProductProvider>
      <BrowserRouter>
        <NavBar />
        {isLoggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<NewPostPage />} />
              
            </Routes>
          </>
        ) : (
          <PageLayout>Please log in</PageLayout>
        )}
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
