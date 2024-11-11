import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import supabase from '../supabaseClient';
import MovieCard from '../components/MovieCard';
import { fetchMovieDetails } from '../services/tmdbApi';

const MyPage = () => {
  const { user } = useContext(AuthContext);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchBookmarks = async () => {
        const { data: bookmarks, error } = await supabase
          .from('bookmarks')
          .select('movie_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('북마크를 가져오는데 실패했습니다:', error);
        } else {
          const movies = await Promise.all(
            bookmarks.map(async (bookmark) => {
              const movieData = await fetchMovieDetails(bookmark.movie_id);
              return movieData;
            })
          );
          setBookmarkedMovies(movies);
        }
      };

      fetchBookmarks();
    }
  }, [user]);

  if (!user) {
    return <div className="container mx-auto px-4 py-8 mt-16">로그인이 필요합니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-2xl font-bold mb-4">나의 북마크</h2>
      {bookmarkedMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bookmarkedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>북마크한 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default MyPage;
