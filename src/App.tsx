import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Popular from "./pages/Popular";
import CreatePost from "./pages/CreatePost";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/popular"
          element={<Popular />}
        />

        <Route
          path="/crear"
          element={<CreatePost />}
        />

        <Route
          path="/publicaciones"
          element={<Posts />}
        />

        <Route path="/post/:id" element={<PostDetail />} />


        {/* 🔥 CATEGORÍAS */}
        <Route path="/categoria/:category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}