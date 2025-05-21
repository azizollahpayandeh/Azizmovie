import Navbar from "./components/Navbar";
import NavbarTop from "./components/NavbarTop";
import SliderMovies from "./components/SliderMovies";
// import MovieList from './components/MovieList';

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <NavbarTop />
      <Navbar />
      {/* Main Content Section */}
      <section className="relative w-full">
        <SliderMovies />
      </section>
      {/* <MovieList /> */}
      {/* Other sections will be added later */}
    </div>
  );
}