/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
    },
  },
  plugins: [],
  corePlugins: {
    position: true,
    gridTemplateColumns: true,
    gridColumn: true,
    gridRow: true,
    gridAutoFlow: true,
    gridAutoColumns: true,
    gridAutoRows: true,
    gap: true,
    space: true,
    divideWidth: true,
    divideColor: true,
    divideOpacity: true,
    divideStyle: true,
  }
} 