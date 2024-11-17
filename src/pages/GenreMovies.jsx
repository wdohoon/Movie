import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchMoviesByGenre } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { Film, Loader } from 'lucide-react';

const GenreMovies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const moviesData = await fetchMoviesByGenre(selectedGenre);
        setMovies(moviesData);
        setLoading(false);
      };
      getMovies();
    }
  }, [selectedGenre]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <Film className="mr-2" /> 장르별 영화
          </h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedGenre === genre.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : selectedGenre ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 dark:text-gray-300">선택한 장르의 영화가 없습니다.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">다른 장르를 선택해보세요.</p>
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 dark:text-gray-300">장르를 선택하세요.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">영화를 보려면 위의 장르 중 하나를 클릭하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreMovies;