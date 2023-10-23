/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    screens: {
      'desktop': {'min': '1024px'},
      'mobile': {'max': '1023px'},
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
