
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  // ✅ Safelist only at root level
  safelist: [
    'text-custom-1',
    'text-custom-2',
    'text-custom-3',
    'text-custom-4',
    'text-custom-5',
  ],

  theme: {
    extend: {
      height: {
        "500vh": "500vh",
      },
      width: {
        "400vw": "400vw",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #e6f0ff, #ffffff)',
      },

      // ✅ Merge all custom colors into a single `colors` block
      colors: {
        'custom-1': '#EC1C24',
        'custom-2': '#131016',
        'custom-3': '#224A01',
        'custom-4': '#F9EC31',
        'custom-5': '#DC154C',

        brown: {
          600: '#692a05ff',
        },
        parrotGreen: {
          400: '#5cf12eff',
        },
      },
    },
  },

  plugins: [],
};
