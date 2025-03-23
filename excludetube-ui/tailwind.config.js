const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          '50': '#f0f0f0',
          '100': '#d1d1d1',
          '200': '#b3b3b3',
          '300': '#9a9a9a',
          '400': '#858585',
          '500': '#666666',
          '600': '#4d4d4d',
          '700': '#333333',
          '800': '#1f1f1f',
          '900': '#0f0f0f',
          '950': '#050505',
        },
      },
    },
  },
  plugins: [],
};
