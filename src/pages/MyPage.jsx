import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import supabase from '../contexts/SupabaseClient.js';
import MovieCard from '../components/MovieCard';
import { fetchMovieDetails } from '../services/tmdbApi';
import { Bookmark, Loader } from 'lucide-react';

const MyPage = () => {
  const { user } = useContext(AuthContext);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchBookmarks = async () => {
        setLoading(true);
        const { data: bookmarks, error } = await supabase
          .from('bookmarks')
          .select('movie_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('북마크를 가져오는데 실패했습니다:', error);
          setLoading(false);
        } else {
          const movies = await Promise.all(
            bookmarks.map(async (bookmark) => {
              const movieData = await fetchMovieDetails(bookmark.movie_id);
              return movieData;
            })
          );
          setBookmarkedMovies(movies);
          setLoading(false);
        }
      };

      fetchBookmarks();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">로그인이 필요합니다</h2>
          <p className="text-gray-600 dark:text-gray-300">북마크한 영화를 보려면 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <Bookmark className="mr-2" /> 나의 북마크
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {bookmarkedMovies.length > 0
              ? `총 ${bookmarkedMovies.length}개의 영화를 북마크했습니다.`
              : '아직 북마크한 영화가 없습니다.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : bookmarkedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {bookmarkedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 dark:text-gray-300">북마크한 영화가 없습니다.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">영화 상세 페이지에서 북마크를 추가해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;