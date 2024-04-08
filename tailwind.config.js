/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {
      colors: {
        wall: '#F4F6FC',
        overlay: 'rgba(108,134,173,0.6)',
        blue: {
          btnLight: '#D5E4FA',
          btnNeutral: '#B5D3FA',
          txtLight: '#2F8AF5',
        },
      },
      backdropBlur: {
        default: '3px',
      }
    },
  },
  plugins: [],
}
