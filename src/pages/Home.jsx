import React, { useState, useEffect } from 'react'
import { fetchPopularMovies } from '../services/tmdbApi'
import MovieCard from '../components/MovieCard'
import MainSlide from "../components/MainSlide"
import { ChevronDown } from 'lucide-react'

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
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">인기 영화</h2>
          <div className="overflow-hidden">
            <div className="p-0">
              <MainSlide />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">영화 목록</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
            ))}
            {loading &&
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="overflow-hidden">
                  <div className="p-0">
                    <div className="h-[300px] w-full" />
                    <div className="p-4">
                      <div className="h-4 w-2/3 mb-2" />
                      <div className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="flex items-center gap-2"
            >
              더 보기
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}