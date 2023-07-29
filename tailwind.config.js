/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    
    './node_modules/native-base/**/*.js,jsx,ts,tsx}',
    './node_modules/react-native-paper/**/*.js,jsx,ts,tsx}',
    './node_modules/react-native-elements/**/*.js,jsx,ts,tsx}',
    './node_modules/react-native-vector-icons/**/*.js,jsx,ts,tsx',
    './node_modules/react-native-safe-area-context/**/*.js,jsx,ts,tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
