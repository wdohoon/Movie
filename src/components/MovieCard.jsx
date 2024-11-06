import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'error';

  const handleClick = () => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
      onClick={handleClick}
    >
      <img
        className="w-full h-64 object-cover"
        src={posterUrl}
        alt={movie.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        <p className="font-semibold">평점: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
