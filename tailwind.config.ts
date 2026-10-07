import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern, Powerful, Premium Architectural Orange
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c", // Primary Vibrant Brand Orange
          700: "#c2410c", // Deep Rich Orange
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        // Dark Anthracite, Slate & Charcoal Palette
        anthracite: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a", // Dark Anthracite Header/Cards
          950: "#070b14", // Deep Charcoal Dark
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f8fafc",
          muted: "#f1f5f9",
          dark: "#0f172a",
          charcoal: "#070b14",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "Montserrat", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 14px 32px -4px rgba(234, 88, 12, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'premium': '0 20px 40px -10px rgba(15, 23, 42, 0.25)',
        'glow-orange': '0 0 25px -5px rgba(234, 88, 12, 0.4)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
