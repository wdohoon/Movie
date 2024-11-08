// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import MainSlide from "../components/MainSlide.jsx";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = async (page) => {
    try {
      const data = await fetchPopularMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error('영화 데이터를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      movies.length
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [movies]);

  return (
    <div className="container mx-auto px-4 py-8 mt-16 dark:bg-black">
      <MainSlide />
      <h1 className="text-3xl font-bold mb-6 text-center">영화 목록</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
