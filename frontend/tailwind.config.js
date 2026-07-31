/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tea: {
          dark: '#1B4332',      // main - dark green
          forest: '#2D5A45',
          gold: '#C89B3C',      // secondary - golden
          goldLight: '#E0BA6B',
          cream: '#FBF6EC',     // background - cream white
          leaf: '#588157',      // accent - leaf green
          ink: '#1C1C1C',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(27, 67, 50, 0.25)',
      },
    },
  },
  plugins: [],
}
