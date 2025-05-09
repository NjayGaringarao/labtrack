/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#47A897",
        background: "#CFFCF9",
        secondary: "#9DCAC5",
        panel: "#A6CDC6",
        uBlack: "#1f2937",
        uGray: "#4b5563",
        uGrayLight: "#9ca3af",
        failed: "#dc2626",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
