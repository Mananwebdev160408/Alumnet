import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        "safety-orange": {
          DEFAULT: "hsl(var(--safety-orange))",
          foreground: "hsl(var(--safety-orange-foreground))",
        },
        "electric-blue": {
          DEFAULT: "hsl(var(--electric-blue))",
          foreground: "hsl(var(--electric-blue-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "outline": "var(--outline)",
        "on-error-container": "var(--on-error-container)",
        "surface-container-low": "var(--surface-container-low)",
        "on-secondary": "var(--on-secondary)",
        "on-secondary-fixed-variant": "var(--on-secondary-fixed-variant)",
        "inverse-on-surface": "var(--inverse-on-surface)",
        "on-primary": "var(--on-primary)",
        "outline-variant": "var(--outline-variant)",
        "on-primary-container": "var(--on-primary-container)",
        "on-secondary-container": "var(--on-secondary-container)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        "on-surface": "var(--on-surface)",
        "surface-dim": "var(--surface-dim)",
        "secondary-fixed": "var(--secondary-fixed)",
        "on-secondary-fixed": "var(--on-secondary-fixed)",
        "surface-container": "var(--surface-container)",
        "tertiary-container": "var(--tertiary-container)",
        "on-background": "var(--on-background)",
        "on-surface-variant": "var(--on-surface-variant)",
        "secondary-container": "var(--secondary-container)",
        "inverse-surface": "var(--inverse-surface)",
        "surface": "var(--surface)",
        "primary-container": "var(--primary-container)",
        "error-container": "var(--error-container)",
        "on-tertiary": "var(--on-tertiary)",
        "on-tertiary-container": "var(--on-tertiary-container)",
        "inverse-primary": "var(--inverse-primary)",
        "secondary-fixed-dim": "var(--secondary-fixed-dim)",
        "surface-bright": "var(--surface-bright)",
        "on-tertiary-fixed": "var(--on-tertiary-fixed)",
        "on-primary-fixed-variant": "var(--on-primary-fixed-variant)",
        "primary-fixed": "var(--primary-fixed)",
        "tertiary": "var(--tertiary)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "on-error": "var(--on-error)",
        "surface-variant": "var(--surface-variant)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "tertiary-fixed-dim": "var(--tertiary-fixed-dim)",
        "surface-tint": "var(--surface-tint)",
        "primary-fixed-dim": "var(--primary-fixed-dim)",
        "on-tertiary-fixed-variant": "var(--on-tertiary-fixed-variant)",
        "tertiary-fixed": "var(--tertiary-fixed)",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
