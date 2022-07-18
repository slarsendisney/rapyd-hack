/** @type {import('tailwindcss').Config} */

const additionalColors = {
  "site-text": "var(--color-text)",
  "site-background": "var(--color-bg)",
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  "accent-1": "var(--color-accent-1)",
  "accent-2": "var(--color-accent-2)",
  "accent-3": "var(--color-accent-3)",
  "accent-4": "var(--color-accent-4)",
  "site-text-light": "var(--color-text-light)",
  "site-background-light": "var(--color-bg-light)",
  "primary-light": "var(--color-primary-light)",
  "secondary-light": "var(--color-secondary-light)",
  "accent-1-light": "var(--color-accent-1-light)",
  "accent-2-light": "var(--color-accent-2-light)",
  "accent-3-light": "var(--color-accent-3-light)",
  "accent-4-light": "var(--color-accent-4-light)",
  "site-text-dark": "var(--color-text-dark)",
  "site-background-dark": "var(--color-bg-dark)",
  "primary-dark": "var(--color-primary-dark)",
  "secondary-dark": "var(--color-secondary-dark)",
  "accent-1-dark": "var(--color-accent-1-dark)",
  "accent-2-dark": "var(--color-accent-2-dark)",
  "accent-3-dark": "var(--color-accent-3-dark)",
  "accent-4-dark": "var(--color-accent-4-dark)",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        flip: "-1",
      },
      minWidth: {
        "1/2": "50%",
      },
      colors: {
        ...additionalColors,
      },
      textDecorationColor: {
        ...additionalColors,
      },
      textColor: {
        ...additionalColors,
      },
      backgroundColor: {
        ...additionalColors,
      },
      borderColor: {
        ...additionalColors,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
