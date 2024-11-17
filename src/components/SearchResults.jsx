import React from 'react';
import MovieCard from './MovieCard';
import { X } from 'lucide-react';

const SearchResults = ({ movies, onClose }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-90"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            검색 결과: {movies.length}개의 영화
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="검색 결과 닫기"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
