import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos, fetchRecommendedMovies } from '../services/tmdbApi';
import { AuthContext } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';
import { Bookmark, Star, Clock, Calendar } from 'lucide-react';
import supabase from "../contexts/SupabaseClient.js";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
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
        title: movie.title,
        poster_path: movie.poster_path,
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
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);

        const videoData = await fetchMovieVideos(id);
        setVideos(videoData);

        const recommendations = await fetchRecommendedMovies(id);
        setRecommendedMovies(recommendations);
      } catch (error) {
        console.error('영화 상세 정보를 가져오는데 실패했습니다:', error);
      }
    };
    getMovieDetail();
  }, [id]);

  if (!movie) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;

  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Image';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const trailer = videos.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[70vh]"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="container mx-auto flex items-end">
            <img
              className="w-48 h-72 rounded-lg shadow-lg mr-8 hidden md:block"
              src={posterUrl}
              alt={movie.title}
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
              <p className="text-xl text-gray-300 mb-4 italic">{movie.tagline}</p>
              <div className="flex items-center mb-4 text-yellow-400">
                <Star className="w-6 h-6 mr-2" />
                <span className="text-2xl font-bold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-gray-300 ml-2">({movie.vote_count.toLocaleString()}명 참여)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <button
              onClick={handleBookmark}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 flex items-center"
            >
              <Bookmark className="w-5 h-5 mr-2" />
              북마크 추가
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">줄거리</h2>
              <p className="text-gray-700 dark:text-gray-300">{movie.overview}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">개봉일</p>
                  <p className="font-semibold">{movie.release_date}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">런타임</p>
                  <p className="font-semibold">{movie.runtime}분</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">장르</p>
                <p className="font-semibold">{movie.genres.map((genre) => genre.name).join(', ')}</p>
              </div>
            </div>
            {trailer && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <h3 className="text-xl font-bold p-4 bg-gray-100 dark:bg-gray-700">트레일러</h3>
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allowFullScreen
                    title="트레일러"
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
          {recommendedMovies.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
              <h3 className="text-2xl font-bold mb-4">추천 영화</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {recommendedMovies.slice(0, 4).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
