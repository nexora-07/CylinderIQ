import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Register from './components/AuthPage'; 
import LoginPage from './components/LoginPage';
import Dashboard from './pages/Dashboard';

// FIX: Change '../pages/LinkDevice' to './pages/LinkDevice'
import LinkDevice from './pages/LinkDevice'; 

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
        <Navbar />
        
        <div className="pt-16"> 
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Handshake Route */}
            <Route path="/link-device" element={<LinkDevice />} />
            
            {/* Temporary catch-all to prevent blank screens during testing */}
            <Route path="*" element={<div className="pt-32 text-center">Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;