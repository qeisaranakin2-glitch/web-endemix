import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import CoffeeProcess from "./components/CoffeeProcess";
import Origin from "./components/Origin";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="bg-[#f1ece2] text-[#17130f]">
      <Navbar />
      <Hero />
      <Story />
      <CoffeeProcess />
      <Origin />
      <Products />
      <Gallery />
      <Footer />
    </main>
  );
}

export default App;