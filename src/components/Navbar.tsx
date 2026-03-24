// function Navbar() {
//   return (
//     <nav
//       style={{
//         padding: "20px 40px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         borderBottom: "1px solid rgba(0,0,0,0.05)",
//         position: "sticky",
//         top: 0,
//         backgroundColor: "var(--background)",
//         zIndex: 1000,
//       }}
//     >
//       <h2 style={{ color: "var(--primary)", fontWeight: "bold" }}>
//         CylinderIQ
//       </h2>

//       <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
//         <a href="#" style={{ textDecoration: "none", color: "var(--text)" }}>
//           Features
//         </a>
//         <a href="#" style={{ textDecoration: "none", color: "var(--text)" }}>
//           About
//         </a>
//         <button
//           style={{
//             padding: "8px 18px",
//             backgroundColor: "var(--primary)",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Request Demo
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-sm h-20 flex justify-between items-center px-8 max-w-full mx-auto">
      <div className="flex items-center gap-12">
        <span className="text-2xl font-extrabold tracking-tight text-[#2b3437] font-headline">CylinderIQ</span>
        <div className="hidden md:flex gap-8">
          <a className="text-[#0c56d0] font-bold border-b-2 border-[#0c56d0] transition-colors" href="#">Features</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors" href="#">Solutions</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors" href="#">Pricing</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 text-[#586064] font-medium hover:text-[#0c56d0] transition-colors">Login</button>
        <button className="bg-[#0c56d0] hover:bg-[#004aba] text-[#f8f7ff] px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;