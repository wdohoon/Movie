import React from 'react';
import movieListData from '../data/movieListData.json';
import MovieCard from '../components/MovieCard';
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar, Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';


const Home = () => {
  const movies = movieListData.results;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">영화 목록</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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

export default Home;
