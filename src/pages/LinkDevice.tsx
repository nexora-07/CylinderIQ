import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Added updateDoc

const LinkDevice = () => {
  const [deviceId, setDeviceId] = useState('');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success'>('idle');
  
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(location.state?.role || 'household');

  // 1. Fetch the real role from Firestore on page load
  useEffect(() => {
    const fetchRealRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        }
      }
    };
    fetchRealRole();
  }, []);

  // 2. ACTUAL Sync Logic (Saving to Firebase)
  const handleSync = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setStatus('syncing');

    try {
      // Update the user's document in Firestore with the actual Hardware ID
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        deviceId: deviceId,
        deviceStatus: "online",
        lastSync: new Date().toISOString(),
      });

      // Artificial slight delay for the "Syncing" animation feel
      setTimeout(() => {
        setStatus('success');
        
        // Final redirect after success animation
        setTimeout(() => {
          if (userRole === 'distributor' || userRole === 'logistics') {
            navigate('/distributor-panel');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      }, 1500);

    } catch (error: any) {
      alert("Sync failed: " + error.message);
      setStatus('idle');
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6 relative overflow-hidden text-left font-body">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0c56d0]/20 to-transparent" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0px_40px_80px_-20px_rgba(12,86,208,0.1)] border border-[#abb3b7]/10 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div key="sync-form" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                <div className="flex justify-between items-center mb-12">
                  <div className="flex gap-2">
                    <div className="w-8 h-1 bg-[#0c56d0] rounded-full" />
                    <div className="w-8 h-1 bg-[#0c56d0] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-8 h-1 bg-[#0c56d0] rounded-full" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0c56d0]">Terminal Setup</span>
                </div>

                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-[#0c56d0]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#0c56d0]">
                    <span className="material-symbols-outlined text-4xl animate-pulse">sensors</span>
                  </div>
                  <h1 className="font-headline text-3xl font-bold text-[#2b3437] mb-3">Link Smart Scale</h1>
                  <p className="text-[#586064] text-sm leading-relaxed max-w-xs mx-auto">
                    Enter your hardware ID to initialize the secure telemetry bridge for your <strong className="text-[#0c56d0] capitalize">{userRole}</strong> account.
                  </p>
                </div>

                <div className="space-y-8">
                  <input 
                    type="text"
                    maxLength={10}
                    disabled={status === 'syncing'}
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
                    placeholder="X8-Q2-771"
                    className="w-full text-center text-3xl font-headline font-bold tracking-[0.3em] py-6 bg-[#f1f4f6] border-2 border-transparent focus:border-[#0c56d0] rounded-2xl outline-none placeholder:opacity-20 text-[#2b3437] transition-all"
                  />
                  
                  <motion.button 
                    disabled={deviceId.length < 4 || status === 'syncing'}
                    onClick={handleSync}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-5 rounded-2xl font-headline font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                      deviceId.length >= 4 ? "bg-[#0c56d0] text-white shadow-xl shadow-[#0c56d0]/20" : "bg-[#eaeff1] text-[#abb3b7] cursor-not-allowed"
                    }`}
                  >
                    {status === 'syncing' ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Pair Device</span>
                        <span className="material-symbols-outlined">settings_input_component</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success-view" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-5xl">task_alt</span>
                </div>
                <h2 className="font-headline text-3xl font-bold text-[#2b3437] mb-2">Device Linked</h2>
                <p className="text-[#586064] mb-8 leading-relaxed">
                  Telemetry established. Opening your <br />
                  <span className="font-bold text-[#2b3437]">{userRole === 'distributor' ? 'Fleet Command' : 'Household Dashboard'}</span>...
                </p>
                <div className="w-24 h-1 bg-[#eaeff1] mx-auto rounded-full overflow-hidden">
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2 }} className="w-full h-full bg-green-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
};

export default LinkDevice;