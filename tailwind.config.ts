import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        inter: [
          'var(--inter-font)'
        ],
        sans: [
          '-apple-system',
          'var(--font-blink-mac-system)',
          'Segoe UI',
          'roboto',
          'helvetica',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;