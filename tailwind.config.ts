import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        // added new n column grid as new n
        new2: "repeat(2, minmax(160px, 160px))",
        new3: "repeat(3, minmax(160px, 160px))",
        new4: "repeat(4, minmax(160px, 160px))",
        new5: "repeat(5, minmax(160px, 160px))",
        new6: "repeat(6, minmax(160px, 160px))",
      },
    },
  },
  plugins: [],
};
export default config;
