import React, {useEffect, useState} from 'react';
import MovieCard from '../components/MovieCard';
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import {fetchPopularMovies} from "../services/tmdbApi.js";


const MainSlide = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('영화 데이터를 가져오는데 실패했습니다:', error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        className="!py-2"
        modules={[Navigation, A11y, Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          320: {slidesPerView: 1},
          480: {slidesPerView: 2},
          768: {slidesPerView: 3},
          1024: {slidesPerView: 4},
          1280: {slidesPerView: 5},
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlide;
