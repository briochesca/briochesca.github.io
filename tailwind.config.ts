import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial de Brioches C.A.
        primary: {
          wine: '#960647',    // Vinotinto principal
          green: '#639100',   // Verde
          blue: '#0263A8',    // Azul
          orange: '#D97503',  // Naranja
        },
        // Variantes de la paleta
        wine: {
          50: '#fdf2f7',
          100: '#fce7f0',
          500: '#960647',
          600: '#7a0539',
          700: '#5f042c',
          800: '#4a031f',
          900: '#390213',
        },
        green: {
          50: '#f4f8ed',
          100: '#e8f0da',
          500: '#639100',
          600: '#527700',
          700: '#415d00',
          800: '#314600',
          900: '#213000',
        },
        blue: {
          50: '#f0f7fd',
          100: '#e0eefa',
          500: '#0263A8',
          600: '#024f89',
          700: '#013c6a',
          800: '#012a4b',
          900: '#01192e',
        },
        orange: {
          50: '#fef4ed',
          100: '#fde8da',
          500: '#D97503',
          600: '#b55e02',
          700: '#914702',
          800: '#6d3502',
          900: '#4a2401',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-up': 'scaleUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 20px rgba(150, 6, 71, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(150, 6, 71, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #960647 0%, #639100 25%, #0263A8 50%, #D97503 100%)',
        'gradient-wine': 'linear-gradient(135deg, #960647 0%, #7a0539 100%)',
        'gradient-green': 'linear-gradient(135deg, #639100 0%, #527700 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0263A8 0%, #024f89 100%)',
        'gradient-orange': 'linear-gradient(135deg, #D97503 0%, #b55e02 100%)',
      },
    },
  },
  plugins: [],
};

export default config;