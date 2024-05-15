import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/:id/edit" element={<UpdateCategory />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/post/:id/edit" element={<UpdatePost />} />
        <Route path="/magazine" element={<Magazines />} />
        <Route path="/magazine/add" element={<AddMagazine />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
