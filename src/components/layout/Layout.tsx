import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const SakuraPetals = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals(prev => [...prev.slice(-20), Date.now()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {petals.map(id => (
        <div 
          key={id} 
          className="sakura-petal" 
          style={{ 
            left: `${Math.random() * 100}vw`, 
            animationDuration: `${Math.random() * 5 + 5}s`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            opacity: Math.random() * 0.6 + 0.2
          }} 
        />
      ))}
    </>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');
  const isHomePage = location.pathname === '/';
  const routeLabel = location.pathname
    .split("/")
    .filter(Boolean)
    .slice(-1)[0]
    ?.replace(/-/g, " ")
    .toUpperCase() || "DASHBOARD";

  if (isHomePage) {
    return (
      <div className="mountain-bg min-h-screen">
        <SakuraPetals />
        {children}
      </div>
    );
  }

  if (isAuthPage) {
    return (
      <div className="washi-texture min-h-screen relative overflow-x-hidden">
        <SakuraPetals />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen washi-texture mountain-bg bg-fixed bg-background text-foreground transition-colors duration-500">
      <SakuraPetals />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 pt-20 min-h-screen relative z-10 pb-24 md:pb-0">
          <div className="mx-auto w-full max-w-[1700px] px-3 py-4 sm:px-6 sm:py-6 md:px-10 md:py-9">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden border-2 border-border bg-card/92 shadow-[12px_12px_0_0_rgba(26,26,26,0.1)] min-h-[calc(100vh-8rem)] p-4 sm:p-6 md:p-10 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-0 washi-texture opacity-20" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,183,197,0.14),transparent_33%),radial-gradient(circle_at_bottom_left,rgba(188,0,45,0.08),transparent_30%)]" />
              <div className="relative z-10 mb-4 flex items-center justify-between gap-3 border-b border-border/20 pb-4 sm:mb-6 sm:pb-5 md:mb-8">
                <div className="inline-flex items-center gap-2 border border-border/50 bg-background/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  <Flower className="size-3" />
                  {routeLabel}
                </div>
                <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.35em] text-foreground/35">Sakura Network Interface</div>
              </div>
              <div className="relative z-10">
              {children}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <MobileSidebar />
    </div>
  );
};
