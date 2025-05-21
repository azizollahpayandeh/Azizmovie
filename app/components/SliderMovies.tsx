'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const movies = [
  {
    title: 'Joker',
    poster: '/pics/annette-poster-691x1024-1.jpg',
    banner: '/pics/13980319122404690176142110.jpg',
    rating: 8.4,
    link: '/movies/joker',
  },
  {
    title: 'Money Heist',
    poster: '/pics/Horror-Movie-Poster-vol2.jpg',
    banner: '/pics/file.jpg',
    rating: 8.2,
    link: '/movies/money-heist',
  },
  {
    title: 'The Penguin',
    poster: '/pics/file.jpg',
    banner: '/pics/annette-poster-691x1024-1.jpg',
    rating: 7.9,
    link: '/movies/the-penguin',
  },
  {
    title: 'Vikings',
    poster: '/pics/13980319122404690176142110.jpg',
    banner: '/pics/Horror-Movie-Poster-vol2.jpg',
    rating: 8.5,
    link: '/movies/vikings',
  },
];

export default function SliderMovies() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % movies.length);
    }, 3000);

    // تابع بازگشتی برای cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSelect = (idx: number) => {
    setActive(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % movies.length);
      }, 3000);
    }
  };

  return (
    <div className="w-full relative pt-4 md:pt-8 bg-black">
      {/* بک‌گراند اصلی که کل فضا را پوشش می‌دهد - در موبایل مخفی می‌شود */}
      <div className="absolute inset-0 w-full h-[80vh] overflow-hidden hidden sm:block">
        <div className="w-full h-full relative">
          <Image
            src={movies[active].banner}
            alt={movies[active].title}
            fill
            className="object-cover transition-all duration-700"
            priority
          />
          {/* گرادیانت سیاه از راست به چپ برای تیره کردن بخش اسلایدر */}
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
          {/* گرادیانت تیره از پایین برای متن */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          {/* گرادیانت تیره از بالا برای ادغام با منوی بالا */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent h-32"></div>
          {/* گرادیانت‌های کناری برای ادغام با بدنه سایت */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-16"></div>
          <div className="absolute inset-0 right-0 bg-gradient-to-l from-black to-transparent w-16"></div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 w-full min-h-0">
        {/* بک گراند موبایل - فقط در موبایل نمایش داده می‌شود */}
        <div className="sm:hidden relative w-full h-[30vh] mb-2">
          <Image
            src={movies[active].banner}
            alt={movies[active].title}
            fill
            className="object-cover rounded-lg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          {/* دکمه پخش در موبایل */}
          <Link href={movies[active].link}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-25 border-2 border-white hover:bg-opacity-40 group">
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:bg-yellow-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-black ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          {/* بخش سمت چپ - فقط دکمه پخش - در موبایل مخفی می‌شود */}
          <div className="w-full sm:w-[40%] lg:w-[40%] hidden sm:flex items-center justify-center h-[80vh]">
            <div className="text-white p-4 md:p-8">
              {/* دکمه پخش فیلم */}
              <Link href={movies[active].link}>
                <div className="flex items-center justify-center w-16 md:w-20 h-16 md:h-20 rounded-full bg-white bg-opacity-25 border-2 border-white hover:bg-opacity-40 transition-all transform hover:scale-110 group">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:bg-yellow-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* بخش راست - اسلایدر و اطلاعات فیلم */}
          <div className="w-full sm:w-[60%] lg:w-[60%] sm:h-[80vh] flex flex-col items-start justify-center">
            {/* اسلایدر بزرگتر */}
            <div className="w-full px-4 sm:px-6 md:px-10">
              {/* هدر با عنوان فیلم و دکمه‌ها در یک خط افقی */}
              <div className="flex flex-row justify-between items-center mb-2 sm:mb-4 md:mb-6 w-full pr-2">
                {/* اطلاعات فیلم */}
                <div className="text-left">
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white">{movies[active].title}</h1>
                  <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2">
                    <span className="bg-yellow-400 text-black font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">IMDB</span>
                    <span className="text-base sm:text-xl md:text-2xl font-bold text-white">{movies[active].rating}</span>
                    <span className="text-xs sm:text-sm md:text-lg text-white">/10</span>
                  </div>
                </div>
                {/* دکمه‌های کنترل در همان خط افقی */}
                <div className="flex space-x-1 items-center">
                  <button
                    className="bg-[#232733] text-white rounded-full p-1 sm:p-1.5 hover:bg-yellow-400 hover:text-black transition"
                    onClick={() => handleSelect((active - 1 + movies.length) % movies.length)}
                    aria-label="قبلی"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="bg-[#232733] text-white rounded-full p-1 sm:p-1.5 hover:bg-yellow-400 hover:text-black transition"
                    onClick={() => handleSelect((active + 1) % movies.length)}
                    aria-label="بعدی"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* اسلایدر */}
              <div className="flex flex-row items-center justify-start sm:justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar">
                {movies.map((movie, idx) => (
                  <div
                    key={movie.title}
                    className={`transition-all duration-500 cursor-pointer flex-shrink-0 ${
                      active === idx
                        ? 'opacity-100 scale-105 sm:scale-110 z-10'
                        : 'opacity-70 scale-95 sm:scale-90 hover:opacity-90 hover:scale-100 sm:hover:scale-95'
                    }`}
                    onClick={() => handleSelect(idx)}
                  >
                    <div
                      className={`relative w-24 sm:w-32 md:w-36 lg:w-44 h-36 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden border-2 sm:border-4 ${
                        active === idx ? 'border-yellow-400' : 'border-transparent'
                      } shadow-lg sm:shadow-xl`}
                    >
                      <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                    </div>
                    {/* اسم فیلم زیر هر اسلاید - در موبایل کوچکتر */}
                    <span
                      className={`mt-1 sm:mt-2 block text-center text-xs sm:text-sm md:text-base font-bold truncate ${
                        active === idx ? 'text-yellow-400' : 'text-white'
                      }`}
                    >
                      {movie.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نشان دادن برگزیده‌ها مشابه عکس */}
      <div className="relative z-10 mt-2 sm:mt-4 text-white text-right px-4 sm:px-8 md:px-12 pb-4 sm:pb-8 bg-black">
        <h3 className="text-lg sm:text-xl font-bold mb-2">برگزیده‌ها</h3>
        {/* محتوای برگزیده‌ها */}
      </div>
    </div>
  );
}