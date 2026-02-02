import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import PlayerDetail from '@/pages/Player/PlayerDetail';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player/:id" element={<PlayerDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
