import type { Config } from "tailwindcss"
const config: Config = {
darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      fontFamily: {
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
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
          light: "hsl(var(--secondary-light))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors (static t-shirt scale for gradients/bg colors)
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Role colors - Seeker (Teal)
        seeker: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          DEFAULT: "hsl(var(--seeker))",
          light: "hsl(var(--seeker-light))",
          dark: "hsl(var(--seeker-dark))",
          foreground: "hsl(var(--seeker-foreground))",
        },
        // Role colors - Employer (Indigo)
        employer: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          DEFAULT: "hsl(var(--employer))",
          light: "hsl(var(--employer-light))",
          dark: "hsl(var(--employer-dark))",
          foreground: "hsl(var(--employer-foreground))",
        },
        // Role colors - Admin (Orange)
        admin: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          DEFAULT: "hsl(var(--admin))",
          light: "hsl(var(--admin-light))",
          dark: "hsl(var(--admin-dark))",
          foreground: "hsl(var(--admin-foreground))",
        },
        // Semantic colors (HSL from CSS variables)
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        info: "hsl(var(--info))",
        // Surface colors
        surface: {
          raised: "hsl(var(--surface-raised))",
          subtle: "hsl(var(--surface-subtle))",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        "glow-brand": "0 10px 30px hsl(var(--brand) / 0.35), 0 0 0 1px hsl(var(--brand) / 0.2)",
        "glow-primary": "0 10px 30px hsl(var(--primary) / 0.35), 0 0 0 1px hsl(var(--primary) / 0.2)",
        "glow-accent": "0 10px 30px hsl(var(--accent) / 0.35), 0 0 0 1px hsl(var(--accent) / 0.2)",
        "glow-seeker": "0 10px 30px hsl(var(--seeker) / 0.35), 0 0 0 1px hsl(var(--seeker) / 0.2)",
        "glow-employer": "0 10px 30px hsl(var(--employer) / 0.35), 0 0 0 1px hsl(var(--employer) / 0.2)",
        "glow-admin": "0 10px 30px hsl(var(--admin) / 0.35), 0 0 0 1px hsl(var(--admin) / 0.2)",
        "elevated": "0 4px 12px hsl(var(--foreground) / 0.08)",
        "card": "0 8px 24px hsl(var(--foreground) / 0.12)",
        "modal": "0 16px 40px hsl(var(--foreground) / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Fade animations
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        // Slide animations
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Scale animations
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        // Special animations
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 200ms var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "fade-out": "fade-out 200ms var(--ease-in, cubic-bezier(0.4, 0, 1, 1))",
        "slide-up": "slide-up 300ms var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "slide-down": "slide-down 300ms var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "slide-in-right": "slide-in-right 300ms var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "slide-in-left": "slide-in-left 300ms var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "scale-in": "scale-in 200ms var(--ease-spring, cubic-bezier(0.175, 0.885, 0.32, 1.275))",
        "scale-out": "scale-out 200ms var(--ease-in, cubic-bezier(0.4, 0, 1, 1))",
        shimmer: "shimmer 1.5s infinite linear",
        float: "float 3s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        spin: "spin 0.6s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
      },
      // Transition timing functions
      transitionTimingFunction: {
        "ease-out": "var(--ease-out, cubic-bezier(0, 0, 0.2, 1))",
        "ease-in-out": "var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1))",
        "ease-spring": "var(--ease-spring, cubic-bezier(0.175, 0.885, 0.32, 1.275))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
