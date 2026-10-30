import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ANK Global Official Logo Brand Colors
        crimson: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#dc0006", // Official ANK Red from Logo
          600: "#c40005",
          700: "#a60004",
          800: "#850003",
          900: "#630002",
          950: "#3d0001",
        },
        gold: {
          50: "#FDFCF7",
          100: "#FAF6EB",
          200: "#F5ECD0",
          300: "#FDE68A",
          400: "#fabc01", // Official ANK Gold / Yellow from Logo
          500: "#e5ab01",
          600: "#ca9501",
          700: "#a37601",
          800: "#7c5901",
          900: "#5a4001",
          950: "#382700",
        },
        // Replaced all Blue/Navy with Executive Obsidian / Charcoal Black (Zero Blue!)
        navy: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#22242B", // Luxury Charcoal Border
          900: "#131418", // Deep Executive Black
          950: "#090A0C", // Pitch Obsidian Black
        },
        charcoal: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#22242B",
          900: "#131418",
          950: "#090A0C",
        },
        emerald: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          700: "#0D7066",
          800: "#0A564E",
          900: "#063B35",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        // Aliased to Ultra Pro Plus Jakarta Sans so all titles render in ultra-clean geometric sans-serif
        serif: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "shimmer-sweep": "shimmerSweep 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.45" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmerSweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
