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
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
export default config;
