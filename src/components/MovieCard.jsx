import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleClick = () => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          className="w-full h-[300px] object-cover"
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center">
          <Star className="w-4 h-4 mr-1" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;