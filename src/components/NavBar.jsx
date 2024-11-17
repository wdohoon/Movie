import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from "./SearchResults.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { searchMovies } from "../services/tmdbApi.js";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import supabase from "../contexts/SupabaseClient.js";
import { Sun, Moon, Search, Menu, X, Film, LogOut, User } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchOpen, setSearchOpen] = useState(false);
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
      setSearchOpen(true);
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
      setSearchOpen(false);
      setMovies([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="fixed w-full z-10 top-0 left-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
            <Film className="mr-2" />
            MovieDH
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="영화 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link to="/genres" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              장르별 영화
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.email}&background=random`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      마이 페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  회원가입
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="영화 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link
              to="/genres"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              장르별 영화
            </Link>
            {!user && (
              <>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  회원가입
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  로그인
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {searchOpen && (
        <SearchResults movies={movies} onClose={() => setSearchOpen(false)} />
      )}
    </nav>
  );
};

export default NavBar;