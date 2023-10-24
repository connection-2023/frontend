import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'sub-color1': 'var(--sub-color1)',
        'sub-color2': 'var(--sub-color2)',
        'sub-color3': 'var(--sub-color3)',
        'sub-color4': 'var(--sub-color4)',
        'admin-bg-color': '#8338EC1A',
      },
      borderRadius: {
        admin: '0.63rem',
      },
      boxShadow: {
        vertical: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        horizontal: '1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        float: '0px 1px 4px 0 rgba(0, 0, 0, 0.25)',
      },
      animation: {
        vibration: 'vibration 0.1s 20',
      },
      keyframes: {
        vibration: {
          '0%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(-1deg)' },
        },
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, Record<string, string>>,
        variants?: Array<string>,
      ) => void;
    }) {
      const newUtilities = {
        '.shrink': {
          animationName: 'shrink',
          animationTimingFunction: 'linear',
          animationDuration: '10s',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};

export default config;
