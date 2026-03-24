import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import CallToAction from './components/CallToAction'; // 1. Import it

function App() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen selection:bg-[#dae2ff]">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <CallToAction /> {/* 2. The Final Piece */}
      </main>
    </div>
  );
}

export default App;