import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Categories } from './pages/categories';
import { UpdateCategory } from './pages/UpdateCategory';
import { AddCategory } from './pages/AddCategory';
import { NotFound } from './pages/NotFound';
import { Posts } from './pages/Posts';
import { AddPost } from './pages/AddPost';
import { UpdatePost } from './pages/UpdatePost';
import Admin from './pages/Admin';
import { Login } from './pages/Login';
import { Magazines } from './pages/Magazines';
import { AddMagazine } from './pages/AddMagazine';
import { UpdateMagazine } from './pages/UpdateMagazine';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/" index element={<Dashboard />} />
        <Route path="/admin/category" element={<Categories />} />
        <Route path="/admin/category/add" element={<AddCategory />} />
        <Route path="/admin/category/:id/edit" element={<UpdateCategory />} />
        <Route path="/admin/post" element={<Posts />} />
        <Route path="/admin/post/add" element={<AddPost />} />
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
