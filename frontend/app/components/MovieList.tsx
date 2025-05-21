// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string;
//   backdrop_path: string;
//   vote_average: number;
//   release_date: string;
// }

// interface ApiResponse {
//   results: Movie[];
// }

// export default function MovieList() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await fetch(
//           'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
//           {
//             headers: {
//               'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU4YzJhODI3ZGU0ZWI5YmM0ZWM0ZWY4YzI4ZTY0YyIsInN1YiI6IjY1ZjM4YzM0YzU2ZGI0MDE4NmM1YjM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2XQkz_8XQkz_8XQkz_8XQkz_8XQkz_8XQkz_8XQkz_8'
//             }
//           }
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data: ApiResponse = await response.json();
        
//         if (!data.results || !Array.isArray(data.results)) {
//           throw new Error('Invalid API response format');
//         }
        
//         setMovies(data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//         setError(error instanceof Error ? error.message : 'Failed to fetch movies');
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
//   }

//   if (!movies || movies.length === 0) {
//     return <div className="flex justify-center items-center min-h-screen text-white">No movies found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6 text-white">Trending Movies</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.map((movie) => (
//           <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//             <div className="relative h-[400px]">
//               <Image
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2 text-white">{movie.title}</h3>
//               <p className="text-gray-400 text-sm mb-2">
//                 Release Date: {new Date(movie.release_date).toLocaleDateString()}
//               </p>
//               <p className="text-gray-400 text-sm mb-2">
//                 Rating: {movie.vote_average.toFixed(1)}/10
//               </p>
//               <p className="text-gray-300 line-clamp-3">{movie.overview}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// } 