import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        code: ["Ubuntu Mono", "monospace"],
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      animation: {
        meteor: "meteor 50s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(230deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(230deg) translateX(-1250px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
