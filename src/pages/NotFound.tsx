import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Protocol breakdown at:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-6 text-center">
      <div className="space-y-8 max-w-md">
        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-10 group cursor-help">
           <span className="material-symbols-outlined text-error text-5xl font-black group-hover:rotate-12 transition-transform">error</span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl font-black text-on-surface tracking-tighter">404</h1>
          <p className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.4em]">Node Not Found</p>
        </div>

        <p className="text-xs font-medium text-on-surface-variant leading-relaxed opacity-60 uppercase tracking-tight">
          The network endpoint <span className="text-primary font-black italic">{location.pathname}</span> does not exist or has been decommissioned.
        </p>

        <Link to="/">
          <button className="mt-6 px-10 py-4 bg-primary-container text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary-container/20 hover:scale-[1.05] active:scale-95 transition-all">
            Return to Core
          </button>
        </Link>
        
        <div className="pt-10">
           <p className="text-[9px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em]">Protocol Fault // Sync Interrupted</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
