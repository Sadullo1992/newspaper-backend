import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import { AddCategoryPage, CategoriesPage, UpdateCategoryPage } from './pages/categories';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';
import { AddMagazinePage } from './pages/magazines/add-magazine';
import { MagazinesPage } from './pages/magazines/magazines';
import { UpdateMagazinePage } from './pages/magazines/update-magazine';
import { NotFound } from './pages/NotFound';
import { AddPostPage, PostsPage, UpdatePostPage } from './pages/posts';

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
        <Route path="/admin/post/:id/edit" element={<UpdatePostPage />} />
        <Route path="/admin/magazine" element={<MagazinesPage />} />
        <Route path="/admin/magazine/add" element={<AddMagazinePage />} />
        <Route path="/admin/magazine/:id/edit" element={<UpdateMagazinePage />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
