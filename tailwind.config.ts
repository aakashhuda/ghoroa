import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        "primary-dark": "#3ecf8e",
        info: "#0891b2",
        success: "#16a34a",
        warning: "#ea580c",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ['"JetBrains Mono"', "monospace", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
