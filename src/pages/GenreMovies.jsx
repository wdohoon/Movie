import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';

const GenreMovies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const getMovies = async () => {
        const moviesData = await fetchMoviesByGenre(selectedGenre);
        setMovies(moviesData);
      };
      getMovies();
    }
  }, [selectedGenre]);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-4">장르별 영화</h2>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">장르를 선택하세요</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreMovies;
