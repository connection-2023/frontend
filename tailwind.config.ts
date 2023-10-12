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
