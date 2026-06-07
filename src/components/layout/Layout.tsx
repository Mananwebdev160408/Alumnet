import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  if (isAuthPage) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 pt-20 min-h-screen relative z-10 pb-24 md:pb-0">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 md:px-8">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div>
          </div>
        </main>
      </div>
      <MobileSidebar />
    </div>
  );
};
