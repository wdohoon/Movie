import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';

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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3]">
        <img
          className="w-full h-full object-cover"
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
          <h3 className="text-white text-lg font-bold line-clamp-2">{movie.title}</h3>
          <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;