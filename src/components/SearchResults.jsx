// src/components/SearchResults.jsx
import React from 'react';
import MovieCard from './MovieCard';

const SearchResults = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 w-screen h-screen z-20 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
