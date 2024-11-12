import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdbApi.js';
import supabase from '../contexts/SupabaseClient.js'; // 경로 수정
import { AuthContext } from '../contexts/AuthContext.jsx';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const handleBookmark = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { data, error } = await supabase.from('bookmarks').insert([
      {
        user_id: user.id,
        movie_id: movie.id,
      },
    ]);

    if (error) {
      console.error('북마크 추가 에러:', error);
      alert('북마크에 실패했습니다: ' + error.message);
    } else {
      alert('북마크에 추가되었습니다.');
    }
  };

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
    : 'error';

  return (
    <div className="">
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
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
          <button onClick={handleBookmark} className="btn btn-primary mb-4">
            북마크 추가
          </button>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.tagline}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span>({movie.vote_count}명 참여)</span>
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
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
