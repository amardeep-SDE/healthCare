// tailwind.config.js
module.exports = {
   darkMode: 'class', // ✅ important!
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // tailwind.config.js
theme: {
  extend: {
     fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    keyframes: {
      shine: {
        '0%': { left: '-100%' },
        '100%': { left: '120%' },
      },
      'fade-up': {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    animation: {
      shine: 'shine 0.8s ease-in-out forwards',
      'fade-up': 'fade-up 0.6s ease-out',
    },
  },
},

  plugins: [],
};
