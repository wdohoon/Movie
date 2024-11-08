import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchResults from "./SearchResults.jsx";
import useDebounce from "../hooks/useDebounce.js";
import {searchMovies} from "../services/tmdbApi.js";
import {ThemeContext} from "../contexts/ThemeContext.jsx";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { theme, toggleTheme } = useContext(ThemeContext);

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
    <nav className="fixed w-full z-10 top-0 left-0">
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
        <div className="hidden md:flex items-center">
          <Link
            to="/signup"
            className="px-3 py-2 rounded-md text-sm font-medium"
          >
            회원가입
          </Link>
          <Link
            to="/login"
            className="px-3 py-2 rounded-md text-sm font-medium"
          >
            로그인
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
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
