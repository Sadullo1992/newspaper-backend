import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AddMagazine } from './pages/AddMagazine';
import Admin from './pages/Admin';
import { AddCategoryPage, CategoriesPage, UpdateCategoryPage } from './pages/categories';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';
import { Magazines } from './pages/Magazines';
import { NotFound } from './pages/NotFound';
import { AddPostPage } from './pages/posts/add-post';
import { PostsPage } from './pages/posts/posts';
import { UpdateMagazine } from './pages/UpdateMagazine';
import { UpdatePost } from './pages/UpdatePost';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/" index element={<Dashboard />} />
        <Route path="/admin/category" element={<CategoriesPage />} />
        <Route path="/admin/category/add" element={<AddCategoryPage />} />
        <Route path="/admin/category/:id/edit" element={<UpdateCategoryPage />} />
        <Route path="/admin/post" element={<PostsPage />} />
        <Route path="/admin/post/add" element={<AddPostPage />} />
        <Route path="/admin/post/:id/edit" element={<UpdatePost />} />
        <Route path="/admin/magazine" element={<Magazines />} />
        <Route path="/admin/magazine/add" element={<AddMagazine />} />
        <Route path="/admin/magazine/:id/edit" element={<UpdateMagazine />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
