/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom-shadow': '0 1px 11px rgba(168, 168, 168, 0.27);',
            },
            flex: {
                'custom-flex-1/3': '33.33333333%',
            },
            screens: {
                mobile: '375px',
                tablet: '768px',
                // max
                destop: '1200px',
                //min
                use400: '400px',
                use600: '600px',
                use700: '700px',
                use800: '800px',
                use900: '900px',
                use1000: '1000px',
            },
        },
    },
    plugins: [require('flowbite/plugin'), require('daisyui')],
};
