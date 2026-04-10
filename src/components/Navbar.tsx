import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { auth, db } from '../firebase'; 
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false); // State for Notification Dropdown
  const [notifications, setNotifications] = useState<any[]>([]);
  const location = useLocation(); 
  const user = auth.currentUser;

  // --- Notification Listener ---
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { isRead: true });
  };

  const isDashboard = 
    location.pathname === '/dashboard' || 
    location.pathname === '/distributor-panel' || 
    location.pathname === '/driver-mode';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-sm h-16 flex justify-between items-center px-6 md:px-10 max-w-full mx-auto transition-all duration-300">
      
      {/* Left: Logo and Desktop Links */}
      <div className="flex items-center gap-10">
        <Link 
          to="/"
          onClick={scrollToTop}
          className="text-xl font-extrabold tracking-tight text-[#2b3437] font-headline cursor-pointer"
        >
          Cylinder<span className="text-[#0c56d0]">IQ</span>
        </Link>

        {!isDashboard && (
          <div className="hidden md:flex gap-8">
            <button onClick={scrollToTop} className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body">Home</button>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#problem">Problem</a>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#solution">Solution</a>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#features">Features</a>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {!isDashboard ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <button className="px-4 py-1.5 text-[#586064] font-bold hover:text-[#0c56d0] transition-colors text-sm font-body">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="bg-[#0c56d0] hover:bg-[#004aba] text-[#f8f7ff] px-5 py-2 rounded-lg font-bold transition-all shadow-sm text-sm font-headline">Get Started</button>
            </Link>
          </div>
        ) : (
          /* LOGISTICS & DASHBOARD VIEW */
          <div className="flex items-center gap-5 relative">
            
            {/* NOTIFICATION HUB */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)} 
                className="material-symbols-outlined text-[#abb3b7] cursor-pointer hover:text-[#0c56d0] transition-colors mt-1.5"
              >
                notifications
              </button>
              
              {/* Red Badge */}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-red-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white pointer-events-none">
                  {unreadCount}
                </span>
              )}

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-[200] overflow-hidden"
                  >
                    <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Alert Center</h3>
                      <button onClick={() => setNotifOpen(false)} className="material-symbols-outlined text-slate-400 text-sm">close</button>
                    </div>

                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="py-12 px-6 text-center">
                          <span className="material-symbols-outlined text-slate-200 text-4xl">notifications_off</span>
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-3">All caught up</p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={() => markAsRead(n.id)}
                            className={`p-5 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 text-left ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <p className={`text-xs font-bold ${n.type === 'warning' ? 'text-red-600' : 'text-[#0c56d0]'}`}>{n.title}</p>
                              {!n.isRead && <div className="w-1.5 h-1.5 bg-[#0c56d0] rounded-full mt-1" />}
                            </div>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 border-l border-[#abb3b7]/20 pl-5">
              <div className="w-8 h-8 rounded-full bg-[#0c56d0]/10 border border-[#0c56d0]/20 flex items-center justify-center text-[#0c56d0] font-bold text-xs">
                KA
              </div>
              <button 
                onClick={() => auth.signOut()}
                className="text-xs font-bold text-[#9f403d] hover:underline uppercase tracking-wider"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
        {!isDashboard && (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#2b3437]">
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isDashboard && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-[#abb3b7]/15 p-6 flex flex-col gap-5 md:hidden shadow-xl"
          >
            <button className="text-left text-base font-medium text-[#586064]" onClick={scrollToTop}>Home</button>
            <a className="text-base font-medium text-[#586064]" href="#problem" onClick={() => setIsOpen(false)}>Problem</a>
            <a className="text-base font-medium text-[#586064]" href="#solution" onClick={() => setIsOpen(false)}>Solution</a>
            <a className="text-base font-medium text-[#586064]" href="#features" onClick={() => setIsOpen(false)}>Features</a>
            <hr className="border-[#abb3b7]/15" />
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)}><button className="w-full py-2.5 text-[#586064] font-bold border border-[#abb3b7]/30 rounded-lg text-sm">Sign In</button></Link>
              <Link to="/register" onClick={() => setIsOpen(false)}><button className="w-full py-2.5 bg-[#0c56d0] text-white font-bold rounded-lg shadow-lg text-sm">Get Started</button></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;