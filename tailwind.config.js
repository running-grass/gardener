/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./{app,pages,components,ui,src}/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
