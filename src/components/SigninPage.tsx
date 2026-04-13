import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  
  // This state tracks which "portal" the user is trying to enter
  const [loginRole, setLoginRole] = useState("household");

  const navigate = useNavigate();

  const roles = [
    { id: "household", label: "Household", icon: "home" },
    { id: "distributor", label: "Distributor", icon: "monitoring" },
    { id: "logistics", label: "Logistics", icon: "local_shipping" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. FETCH REAL ROLE FROM FIRESTORE
      const userDoc = await getDoc(doc(db, "users", user.uid));

if (userDoc.exists()) {
  const userData = userDoc.data();
  const actualRole = userData.role.toLowerCase(); 
  const selectedPortal = loginRole.toLowerCase();

  // 1. STRICTOR CHECK: The portal selected MUST match the role in the database
  if (selectedPortal === actualRole) {
    
    // If they match, proceed to the correct dashboard
    if (actualRole === 'household') {
      navigate('/dashboard');
    } else if (actualRole === 'distributor') {
      navigate('/distributor-panel');
    } else if (actualRole === 'logistics') {
      navigate('/driver-mode');
    }

  } else {
    // 2. BLOCKER: If they don't match exactly, show the error message
    await auth.signOut();
    alert(`Access Denied: You are trying to enter the ${selectedPortal.toUpperCase()} portal, but this account is registered specifically for ${actualRole.toUpperCase()}.`);
    setLoading(false);
  }
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
        className="max-w-md w-full"
      >
        <div className="text-center md:text-left">
          <Link to="/" className="inline-block">
            <span className="font-headline text-3xl font-extrabold tracking-tight text-[#2b3437]">
              Cylinder<span className="text-[#0c56d0]">IQ</span>
            </span>
          </Link>
          <p className="text-[#586064] mt-3 font-medium text-left">Access your predictive dashboard</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#abb3b7]/10 relative overflow-hidden">
          {/* Progress Bar Decor */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f1f4f6]">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              className="h-full w-1/3 bg-[#0c56d0]"
            />
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* PORTAL SELECTOR */}
            <div className="space-y-3 mb-4 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#586064] ml-1">
                Select Access Portal:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setLoginRole(role.id)}
                    className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      loginRole === role.id 
                        ? "border-[#0c56d0] bg-[#0c56d0]/5 text-[#0c56d0]" 
                        : "border-transparent bg-[#f1f4f6] text-[#abb3b7] hover:bg-[#eaeff1]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{role.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[10px]">
                Registered Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">alternate_email</span>
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-[#586064] uppercase tracking-wider text-[10px]">Password</label>
                <button type="button" className="text-[10px] font-bold text-[#0c56d0] uppercase tracking-wider">Forgot?</button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">lock</span>
                <input 
                  type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl outline-none" 
                />
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7] hover:text-[#0c56d0]"
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <motion.button 
              disabled={loading} type="submit" 
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-[#0c56d0] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#0c56d0]/20 flex items-center justify-center gap-2"
            >
              {loading ? "Verifying..." : (
                <>
                  <span className="text-sm uppercase tracking-[0.2em]">Enter Terminal</span>
                  <span className="material-symbols-outlined">login</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 text-[#586064] text-sm font-body">
          Don't have a terminal account? {' '}
          <Link to="/register" className="text-[#0c56d0] font-bold hover:underline">Register device</Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Login;