import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {fetchMovieDetails} from "../services/tmdbApi.js";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('영화 상세 정보를 가져오는데 실패했습니다:', error);
      }
    };
    getMovieDetail();
  }, [id]);

  if (!movie) return <div>로딩 중...</div>;

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : 'error';

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'errpr';

  return (
    <div className="">
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'contain',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent "></div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <img
            className="w-full md:w-auto rounded-lg shadow-lg"
            src={posterUrl}
            alt={movie.title}
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.tagline}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span className="">({movie.vote_count}명 참여)</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">장르: </span>
            {movie.genres.map((genre) => genre.name).join(', ')}
          </div>
          <div className="mb-4">
            <span className="font-semibold">개봉일: </span>
            {movie.release_date}
          </div>
          <div className="mb-4">
            <span className="font-semibold">런타임: </span>
            {movie.runtime}분
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-4">줄거리</h2>
          <p className="">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
