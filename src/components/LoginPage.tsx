import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Added state for email
  const [password, setPassword] = useState(""); // Added state for password
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        console.log("Access Granted. Role:", userRole);

        // 3. Smart Redirect based on Role
        if (userRole === 'distributor') {
          navigate('/distributor-panel');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Fallback if no profile exists in database
        navigate('/dashboard');
      }

    } catch (error: any) {
      console.error("Login Error:", error.message);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-body text-[#2b3437] flex items-center justify-center p-6 text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-headline text-3xl font-extrabold tracking-tight text-[#2b3437]">
              Cylinder<span className="text-[#0c56d0]">IQ</span>
            </span>
          </Link>
          <p className="text-[#586064] mt-3 font-medium">Access your predictive dashboard</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0px_24px_48px_rgba(43,52,55,0.06)] border border-[#abb3b7]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f1f4f6]">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full w-1/3 bg-[#0c56d0]"
            />
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[10px]">
                Registered Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">
                  alternate_email
                </span>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl outline-none font-body"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-[#586064] uppercase tracking-wider text-[10px]">
                  Secure Password
                </label>
                <button type="button" className="text-[10px] font-bold text-[#0c56d0] hover:underline uppercase tracking-wider">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">
                  lock
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl outline-none font-body" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7] hover:text-[#0c56d0] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1 text-left">
              <input 
                type="checkbox" 
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#0c56d0] focus:ring-[#0c56d0]" 
              />
              <label htmlFor="remember" className="text-xs font-medium text-[#586064] font-body">
                Remember Me
              </label>
            </div>

            <motion.button 
              disabled={loading}
              type="submit" 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-[#0c56d0] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#0c56d0]/20 flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : (
                <>
                  <span>Initialize Dashboard</span>
                  <span className="material-symbols-outlined">login</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 text-[#586064] text-sm font-body">
          Don't have a terminal account? {' '}
          <Link to="/register" className="text-[#0c56d0] font-bold hover:underline">
            Register your device
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Login;