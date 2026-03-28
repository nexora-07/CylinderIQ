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
import LinkDevice from './pages/LinkDevice'; 

// 1. Import the new Distributor Dashboard
import DistributorDashboard from './pages/DistributorDashboard'; 

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
            
            {/* 2. Household Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* 3. Distributor Dashboard Route */}
            <Route path="/distributor-panel" element={<DistributorDashboard />} />
            
            {/* Handshake Route */}
            <Route path="/link-device" element={<LinkDevice />} />
            
            <Route path="*" element={<div className="pt-32 text-center">Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;