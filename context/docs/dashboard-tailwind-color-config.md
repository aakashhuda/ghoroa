## Tailwind Config for Theme color reference

```js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
        info: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#0891b2",
          600: "#0e7490",
          700: "#155e75",
        },
        surface: {
          50: "#f4f6fb",
          100: "#eef1f8",
          200: "#e2e7f0",
          300: "#c8d0e0",
          400: "#9aa3be",
          500: "#5a6075",
          600: "#3d4257",
          700: "#1a1d2e",
        },
      },
      boxShadow: {
        card: "0 1px 4px 0 rgba(0,0,0,0.06), 0 4px 16px 0 rgba(0,0,0,0.04)",
        "card-hover":
          "0 4px 12px 0 rgba(0,0,0,0.10), 0 8px 32px 0 rgba(0,0,0,0.07)",
        sidebar: "2px 0 12px 0 rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};
```
