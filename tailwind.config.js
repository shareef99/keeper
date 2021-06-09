const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    mode: "jit",
    theme: {
        extend: {},
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
        container: {
            padding: "2rem",
            center: true,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
