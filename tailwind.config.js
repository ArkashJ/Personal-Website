/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Graphite / true-dark palette
        bg: '#0A0A0A',
        surface: '#111111',
        elevated: '#171717',
        border: '#262626',
        'border-strong': '#404040',
        // Text
        text: '#FAFAFA',
        muted: '#A1A1AA',
        subtle: '#71717A',
        // Accents — restrained
        primary: '#5EEAD4', // teal-300, calmer than the previous neon
        accent: '#22D3EE', // cyan-400 for stats
        success: '#34D399', // emerald
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Sharp edges throughout — only rare elements get any radius
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '2px',
        full: '9999px',
      },
      backgroundImage: {
        // Infinite grid background (subtle)
        grid: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '64px 64px',
      },
    },
  },
  plugins: [],
}
