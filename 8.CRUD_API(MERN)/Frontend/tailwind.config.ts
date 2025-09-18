import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "var(--background)",
      },
    },
  },
  plugins: [],
};

export default config;
