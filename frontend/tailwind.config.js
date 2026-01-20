/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A0F",
        surface: "#0B1220",
        card: "#0F1A2B",
        stroke: "rgba(255,255,255,0.08)",
        text: "#E7ECF4",
        muted: "#A0A9BA",
        accent: "#2F6FED",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
