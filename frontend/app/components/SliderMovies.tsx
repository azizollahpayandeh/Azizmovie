'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  original_title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
}

export default function SliderMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=dfa5362f4601b4cbf6ee318bf9329137');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.results && Array.isArray(data.results)) {
          setMovies(data.results);
          setLoading(false);
        } else if (data && Array.isArray(data)) {
          setMovies(data);
          setLoading(false);
        } else {
          setError('Invalid data format received from API');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies && movies.length > 0) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % movies.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [movies]);

  const handleSelect = (idx: number) => {
    setActive(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % movies.length);
      }, 3000);
    }
  };

  const getImageUrl = (path: string | null, type: 'poster' | 'backdrop' = 'poster') => {
    if (!path) return '/pics/file.jpg';
    // Remove leading slash if exists
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `https://image.tmdb.org/t/p/${type === 'poster' ? 'w500' : 'original'}${cleanPath}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px] text-white">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[400px] text-red-500">Error: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="flex justify-center items-center min-h-[400px] text-white">No movies found</div>;
  }

  const currentMovie = movies[active];

  if (!currentMovie) {
    return <div className="flex justify-center items-center min-h-[400px] text-white">No movie selected</div>;
  }

  // Calculate the start index to show only 3 items at a time, centered around the active item
  const itemsToShow = 3;
  const startIndex = Math.max(0, active - Math.floor(itemsToShow / 2));
  const endIndex = Math.min(movies.length, startIndex + itemsToShow);
  const visibleMovies = movies.slice(startIndex, endIndex);

  // Function to truncate title to two words
  const truncateTitle = (title: string) => {
    const words = title.trim().split(/\s+/);
    if (words.length > 2) {
      return `${words.slice(0, 2).join(' ')}...`;
    }
    return title;
  };

  return (
    <div className="w-full relative pt-4 md:pt-8 bg-black">
      {/* Main background covering the whole area - hidden on mobile */}
      <div className="absolute inset-0 w-full h-[80vh] overflow-hidden hidden sm:block z-0">
        <div className="w-full h-full relative">
          <Image
            src={getImageUrl(currentMovie.backdrop_path, 'backdrop')}
            alt={currentMovie.original_title}
            fill
            className="object-cover transition-all duration-700"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/pics/file.jpg';
            }}
          />
          {/* Gradients with limited height */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full min-h-0">
        {/* Mobile background - only shown on mobile */}
        <div className="sm:hidden relative w-full h-[30vh] mb-2">
          <Image
            src={getImageUrl(currentMovie.poster_path)}
            alt={currentMovie.original_title}
            fill
            className="object-cover rounded-lg"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/pics/file.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          {/* Play button on mobile */}
          <Link href={`/movies/${currentMovie.id}`}>
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
          {/* Left section - only play button - hidden on mobile */}
          <div className="w-full sm:w-1/2 hidden sm:flex items-center justify-center h-[80vh] relative z-20">
            <div className="text-white p-4 md:p-8">
              {/* Play movie button */}
              <Link href={`/movies/${currentMovie.id}`}>
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

          {/* Right section - slider and movie info */}
          <div className="w-full sm:w-1/2 sm:h-[80vh] flex flex-col items-start justify-start">
            {/* Movie info - top left of right section */}
            <div className="w-full px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8">
              <div className="text-left">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white">{currentMovie.original_title}</h1>
                <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2">
                  <span className="bg-yellow-400 text-black font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">IMDB</span>
                  <span className="text-base sm:text-xl md:text-2xl font-bold text-white">{currentMovie.vote_average.toFixed(1)}</span>
                  <span className="text-xs sm:text-sm md:text-lg text-white">/10</span>
                </div>
              </div>
            </div>
            {/* Larger slider */}
            <div className="w-full px-4 sm:px-6 md:px-10 mt-4 sm:mt-6 md:mt-8 relative z-20">
              {/* Control buttons */}
              <div className="flex justify-end mb-2 sm:mb-4 md:mb-6">
                <div className="flex space-x-1 items-center">
                  <button
                    className="bg-[#232733] text-white rounded-full p-1 sm:p-1.5 hover:bg-yellow-400 hover:text-black transition"
                    onClick={() => handleSelect((active - 1 + movies.length) % movies.length)}
                    aria-label="Previous"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="bg-[#232733] text-white rounded-full p-1 sm:p-1.5 hover:bg-yellow-400 hover:text-black transition"
                    onClick={() => handleSelect((active + 1) % movies.length)}
                    aria-label="Next"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Slider */}
              <div className="w-full h-108 sm:h-132 md:h-156 lg:h-180">
                <div className="flex flex-row items-center justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-9 px-9 sm:px-12 md:px-16">
                  {visibleMovies.map((movie, idx) => {
                    const globalIdx = startIndex + idx;
                    return (
                      <div
                        key={movie.id}
                        className={`transition-all duration-500 cursor-pointer flex-shrink-0 relative z-20 ${
                          active === globalIdx
                            ? 'opacity-100 scale-103'
                            : 'opacity-70 scale-95 hover:opacity-90 hover:scale-98'
                        }`}
                        onClick={() => handleSelect(globalIdx)}
                      >
                        <div
                          className={`relative w-20 sm:w-28 md:w-32 lg:w-40 h-30 sm:h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden border-2 sm:border-4 ${
                            active === globalIdx ? 'border-yellow-400' : 'border-transparent'
                          } shadow-lg sm:shadow-xl`}
                        >
                          <Image
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.original_title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/pics/file.jpg';
                            }}
                          />
                        </div>
                        {/* Movie name under each slide - smaller on mobile */}
                        <span
                          className={`mt-1 sm:mt-2 block text-center text-xs sm:text-sm md:text-base font-bold truncate ${
                            active === globalIdx ? 'text-yellow-400' : 'text-white'
                          }`}
                        >
                          {truncateTitle(movie.original_title)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured section similar to the image */}
      <div className="relative z-10 mt-2 sm:mt-4 text-white text-right px-4 sm:px-8 md:px-12 pb-4 sm:pb-8 bg-black">
        <h3 className="text-lg sm:text-xl font-bold mb-2">Featured</h3>
        {/* Featured content */}
      </div>
    </div>
  );
}