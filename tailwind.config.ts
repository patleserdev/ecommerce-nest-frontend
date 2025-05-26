/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Active le dark mode via la classe `dark`
    content: [
      './app/**/*.{js,ts,jsx,tsx}',      // App Router
      './pages/**/*.{js,ts,jsx,tsx}',    // (au cas où tu utilises Pages Router aussi)
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
        fontFamily: {
          sans: 'var(--font-sans)',
          mono: 'var(--font-mono)',
          lexend: 'var(--font-lexend)',
        },
      },
    },
    plugins: [],
  }
  