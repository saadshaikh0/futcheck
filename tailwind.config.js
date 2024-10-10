const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "scale-125": {
          raw: "(min-resolution: 120dpi), (min-device-pixel-ratio: 1.25)",
        },
        "scale-150": {
          raw: "(min-resolution: 150dpi), (min-device-pixel-ratio: 1.50)",
        },
      },
      colors: {
        charcoal: "#151515",
      },
    },
  },

  plugins: [
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
