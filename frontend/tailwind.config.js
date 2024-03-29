/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pageSlideUp: {
          '0%': { transform: 'translateY(50px)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.25)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'page-slide-up': 'pageSlideUp .5s ease',
        'scale-up': 'scaleUp .5s ease',
        'fade-in': 'fadeIn .25s'
      },
    },
  },
  plugins: [],
}

