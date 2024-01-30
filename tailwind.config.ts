import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'text-light-header': '#666666',
      'text-dark-header': '#A7A7A7',
      'text-light': '#42446E',
      'text-dark': '#cccccc',
      'bg-light': '#ffffff',
      'bg-dark': '#191919',
      white: '#ffffff',
      black: '#000000',
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
