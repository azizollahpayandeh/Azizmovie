import Navbar from "./components/Navbar";
import NavbarTop from "./components/NavbarTop";
import SliderMovies from "./components/SliderMovies";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <NavbarTop />
      <Navbar />
      {/* Main Content Section */}
      <section className="relative w-full">
        <SliderMovies />
      </section>
      {/* سایر بخش‌ها بعداً اضافه می‌شود */}
    </div>
  );
}