import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative size-10 rounded-none border-2 border-border bg-white dark:bg-card hover:bg-secondary/20 transition-all shadow-strong group overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 180 : 0,
          scale: 1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative z-10"
      >
        {theme === "dark" ? (
          <Moon className="size-5 text-primary" />
        ) : (
          <Sun className="size-5 text-primary" />
        )}
      </motion.div>
      <div className="absolute inset-0 washi-texture opacity-20 pointer-events-none" />
      
      <span className="sr-only">Toggle theme</span>
      
      {/* Tooltip-like decorative text */}
      <div className="absolute -bottom-10 group-hover:bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-primary transition-all duration-300 italic opacity-0 group-hover:opacity-100">
        {theme === "dark" ? "Moonlit" : "Daylight"}
      </div>
    </Button>
  )
}
