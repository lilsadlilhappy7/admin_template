/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
   theme: {
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: "oklch(var(--primary))",
        secondary: "oklch(var(--secondary))",
        destructive: "oklch(var(--destructive))",
        muted: "oklch(var(--muted))",
        accent: "oklch(var(--accent))",
        popover: "oklch(var(--popover))",
        card: "oklch(var(--card))",
      },
    },
  },
  plugins: [],
}