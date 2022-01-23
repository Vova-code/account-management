module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'upper': '0 8px 20px -1px rgb(0 0 0 / 0.1), 0 2px 15px -2px rgb(0 0 0 / 0.08)',
      }
    },
  },
  plugins: [],
}
