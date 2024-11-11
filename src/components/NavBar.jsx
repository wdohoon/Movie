import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchResults from "./SearchResults.jsx";
import useDebounce from "../hooks/useDebounce.js";
import {searchMovies} from "../services/tmdbApi.js";
import {ThemeContext} from "../contexts/ThemeContext.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";
import supabase from "../SupabaseClient.js";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('로그아웃에 실패했습니다: ' + error.message);
    } else {
      alert('로그아웃되었습니다.');
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchData = async () => {
        try {
          const data = await searchMovies(debouncedSearchTerm);
          setMovies(data.results);
        } catch (error) {
          console.error('검색 결과를 가져오는데 실패했습니다:', error);
        }
      };
      fetchData();
    } else {
      setMovies([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <nav className="fixed w-full z-10 top-0 left-0 bg-white dark:bg-black border-b border-b-black dark:border-b-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MyMovieApp
        </Link>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="영화 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-md text-sm focus:outline-none text-black"
          />
          <button
            onClick={toggleTheme}
            className="ml-4 focus:outline-none"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {searchTerm && <SearchResults movies={movies}/>}
        </div>
        <div className="flex items-center">
          {user ? (
            // 로그인된 상태
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg">
                  <Link
                    to="/mypage"
                    className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    마이 페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            // 로그인되지 않은 상태
            <>
              <Link
                to="/signup"
                className="text-black dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                회원가입
              </Link>
              <Link
                to="/login"
                className="text-black dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
        {isOpen && (
          <div className="md:hidden">
            <Link
              to="/signup"
              className="block px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              회원가입
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          </div>
        )}
    </nav>
);
};

export default NavBar;
