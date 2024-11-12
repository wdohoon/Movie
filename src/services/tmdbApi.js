import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const fetchMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const fetchRecommendedMovies = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/recommendations`);
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data.results;
};
