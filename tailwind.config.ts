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
        heartbeat: 'heartbeat 1s 3',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
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
