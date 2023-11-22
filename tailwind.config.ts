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
        'main-color-transparent': 'var(--main-color-transparent)',
        'sub-color1': 'var(--sub-color1)',
        'sub-color1-transparent': 'var(--sub-color1-transparent)',
        'sub-color2': 'var(--sub-color2)',
        'sub-color2-transparent': 'var(--sub-color2-transparent)',
        'sub-color3': 'var(--sub-color3)',
        'sub-color3-transparent': 'var(--sub-color3-transparent)',
        'sub-color4': 'var(--sub-color4)',
        'sub-color4-transparent': 'var(--sub-color4-transparent)',
        naver: '#03C75A',
        kakao: '#FEE500',
        gray: {
          100: 'var(--gray1)',
          300: 'var(--gray2)',
          500: 'var(--gray3)',
          700: 'var(--gray4)',
          900: 'var(--gray5)',
        },
      },
      backgroundImage: {
        'checkout-receipt': "url('/images/receipt-background.svg')",
      },
      borderRadius: {
        md: '0.31rem',
        lg: '0.63rem',
      },
      maxWidth: {
        tablet: 'var(--max-tablet)',
        desktop: 'var(--max-desktop)',
      },
      boxShadow: {
        vertical: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        horizontal: '1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
        float: '0px 1px 4px 0 rgba(0, 0, 0, 0.25)',
      },
      zIndex: {
        header: '30',
        modal: '50',
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
