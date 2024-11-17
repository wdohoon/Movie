import React, { useState, useEffect } from 'react'
import { fetchPopularMovies } from '../services/tmdbApi'
import MovieCard from '../components/MovieCard'
import MainSlide from "../components/MainSlide"
import { ChevronDown, Loader } from 'lucide-react'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const getMovies = async (page) => {
    try {
      setLoading(true)
      const data = await fetchPopularMovies(page)
      setMovies((prevMovies) => [...prevMovies, ...data.results])
    } catch (error) {
      console.error('영화 데이터를 가져오는데 실패했습니다:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies(page)
  }, [page])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="container mx-auto px-4 py-24">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">인기 영화</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <MainSlide />
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-8 text-center">영화 목록</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
            ))}
            {loading &&
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300 dark:bg-gray-700" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))
            }
          </div>
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5" />
                  로딩 중...
                </>
              ) : (
                <>
                  더 보기
                  <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}