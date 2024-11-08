import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NavBar from "./components/NavBar.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
