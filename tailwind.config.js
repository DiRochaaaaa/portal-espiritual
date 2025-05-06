/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purpleMystic: '#7B1FA2',
        goldAccent: '#D4AF37',
        darkBg: '#150022',
        purpleLight: '#9C27B0',
        purpleDark: '#4A0072',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-mystic': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(123, 31, 162, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(123, 31, 162, 0.8), 0 0 30px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}; 