import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NavBar from "./components/NavBar.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ThemeProvider from './contexts/ThemeContext.jsx';
import AuthProvider from "./contexts/AuthContext.jsx";
import MyPage from "./pages/MyPage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/details/:id" element={<MovieDetail/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
