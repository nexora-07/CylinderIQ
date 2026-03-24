import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Register from './components/AuthPage'; 
import LoginPage from './components/LoginPage';

// This groups all your landing page sections together
const LandingPage = () => (
  <>
    <Hero />
    <Problem />
    <Solution />
    <Features />
    <CallToAction />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navbar stays at the top of every page */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;