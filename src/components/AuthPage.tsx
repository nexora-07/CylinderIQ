import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("household");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setAddress(`Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName, 
        email, 
        role: selectedRole, 
        address, 
        createdAt: new Date().toISOString(),
      });

      if (selectedRole === "distributor" || selectedRole === "logistics") {
        navigate("/distributor-panel"); 
      } else {
        navigate("/link-device", { state: { role: selectedRole } });
      }
    } catch (error: any) {
      alert("Signup failed: " + error.message); 
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: "household", label: "Household", icon: "home_iot_device" },
    { id: "distributor", label: "Distributor", icon: "monitoring" },
    { id: "logistics", label: "Logistics", icon: "local_shipping" },
  ];

  const containerVariants: any = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
  };
  
  const itemVariants: any = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-body text-[#2b3437] flex items-center justify-center p-6 md:p-12 pt-32 text-left">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
      >
        {/* LEFT SIDE: Narrative (Now appears FIRST on mobile via order-1) */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-5 flex flex-col justify-center py-6 lg:py-12 order-1 lg:order-1"
        >
          <div className="space-y-8 text-left">
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Setup your <span className="text-[#0c56d0]">predictive</span> terminal.
            </h1>
            <p className="text-lg text-[#586064] max-w-md">
              Connect your IoT hardware to the cloud and eliminate run-out anxiety forever.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-4">
              {[
                { title: "IoT Sync", icon: "sync", color: "bg-[#dae2ff] text-[#0c56d0]" },
                { title: "Level Prediction", icon: "query_stats", color: "bg-[#e4e2e6] text-[#5f5f62]" },
                { title: "Safety Protocol", icon: "encrypted", color: "bg-[#e3dbfd] text-[#615b77]" },
              ].map((prop, i) => (
                <div key={i} className="p-4 bg-white rounded-xl flex items-center gap-4 border border-[#abb3b7]/15">
                  <div className={`p-2 rounded-lg flex items-center justify-center ${prop.color}`}>
                    <span className="material-symbols-outlined text-xl">{prop.icon}</span>
                  </div>
                  <p className="font-headline font-bold text-[#2b3437] text-sm">{prop.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Form (Now appears SECOND on mobile via order-2) */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-7 flex items-center order-2 lg:order-2"
        >
          <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#abb3b7]/10 relative overflow-hidden">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-sm font-semibold text-[#586064] uppercase text-[11px]">Full Name</label>
                  <input
                    type="text" required value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Kiki Aborisade"
                    className="w-full px-5 py-4 bg-[#f1f4f6] rounded-xl outline-none"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-sm font-semibold text-[#586064] uppercase text-[11px]">Contact Email</label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kiki@cylinderiq.com"
                    className="w-full px-5 py-4 bg-[#f1f4f6] rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 text-left">
                <label className="text-sm font-semibold text-[#586064] uppercase text-[11px]">Select Role</label>  
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2 ${selectedRole === role.id ? "border-[#0c56d0] bg-[#0c56d0]/5 text-[#0c56d0]" : "border-transparent bg-[#f1f4f6] text-[#586064]"}`}
                    >
                      <span className="material-symbols-outlined text-2xl">{role.icon}</span>
                      <span className="font-headline font-bold text-[9px] md:text-[10px] uppercase tracking-tighter">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRole === "household" && (
                <div className="space-y-2 text-left">
                  <label className="text-sm font-semibold text-[#586064] uppercase text-[11px]">Delivery Address</label>
                  <div className="relative">
                    <input
                      type="text" value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address or GPS coordinates"
                      className="w-full px-5 py-4 bg-[#f1f4f6] rounded-xl outline-none pr-12"
                    />
                    <button type="button" onClick={getLocation} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0c56d0]">
                      <span className="material-symbols-outlined">my_location</span>
                    </button>
                  </div>
                  <p className="text-[9px] text-[#abb3b7] ml-1">Tip: GPS coordinates help drivers find you faster.</p>
                </div>
              )}

              <div className="space-y-2 text-left">
                <label className="text-sm font-semibold text-[#586064] uppercase text-[11px]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-5 py-4 bg-[#f1f4f6] rounded-xl outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7]">
                    <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <motion.button
                disabled={loading} type="submit"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-[#0c56d0] text-white font-headline font-bold text-lg rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? "Initializing..." : <><span>Initialize Terminal</span><span className="material-symbols-outlined">arrow_forward</span></>}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#f1f4f6] text-center">
              <p className="text-sm text-[#586064] font-body">
                Already have an account? {' '}
                <Link to="/login" className="text-[#0c56d0] font-bold hover:underline">
                  Sign In here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Register;