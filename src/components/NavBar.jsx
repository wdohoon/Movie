// src/components/NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 fixed w-full z-10 top-0 left-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          MyMovieApp
        </Link>
        <div className="hidden md:flex items-center">
          <Link
            to="/signup"
            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            회원가입
          </Link>
          <Link
            to="/login"
            className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            로그인
          </Link>
        </div>
        {/* 햄버거 메뉴 아이콘 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-200 hover:text-white focus:outline-none"
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
        <div className="md:hidden bg-gray-800">
          <Link
            to="/signup"
            className="block text-gray-200 hover:text-white px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            회원가입
          </Link>
          <Link
            to="/login"
            className="block text-gray-200 hover:text-white px-4 py-2"
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
