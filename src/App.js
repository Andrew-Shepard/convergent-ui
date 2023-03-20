import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import Register from './components/Register';
import AddPartner from './components/AddPartner';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_partner" element={<AddPartner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
