/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom-shadow': '0 1px 11px rgba(168, 168, 168, 0.27);',
            },
            flex: {
                'custom-flex-1/3': '33.33333333%',
            },
        },
    },
};
