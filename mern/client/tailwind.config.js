/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'picture-me': "url('assets/pictures/picture-me.png')",
            },
            screens: {
                'mobile': '480px',
                'tablet': '640px',
                'laptop': '1024px',
                'desktop': '1280px',

                xs: '320px',
                'xs-1': '360px',
                'xs-2': '400px',
                'xs-3': '460px',

                sm: '640px',
                'sm-1': '680px',
                'sm-2': '720px',
                'sm-3': '760px',

                md: '768px',
                'md-1': '800px',
                'md-2': '850px',
                'md-3': '900px',

                lg: '1024px',
                'lg-1': '1100px',
                'lg-2': '1176px',
                'lg-3': '1252px',

                xl: '1280px',
                'xl-1': '1340px',
                'xl-2': '1400px',
                'xl-3': '1460px',

                '2xl': '1536px',
                '2xl-1': '1600px',
                '2xl-2': '1664px',
                '2xl-3': '1728px',

                '3xl': '1920px',
                '3xl-1': '2000px',
                '3xl-2': '2080px',
                '3xl-3': '2160px',

                '4xl': '2400px',
                '4xl-1': '2500px',
                '4xl-2': '2600px',
                '4xl-3': '2700px',

                '5xl': '2880px',
                '5xl-1': '3000px',
                '5xl-2': '3120px',
                '5xl-3': '3240px',
            },
            darkMode: ['selector', '[data-mode="dark"]'],
            lightMode: ['selector', '[data-mode="light"]']
        },
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {},
            ...(process.env.NODE_ENV === 'production' ? {cssnano: {}} : {})
        },
        function ({ addUtilities }) {
            addUtilities({
                '.text-stroke': {
                    '-webkit-text-stroke': '3px white',
                    'color': 'transparent',
                },
            });
        },
        function ({ addUtilities }) {
            addUtilities({
                '.text-stroke-small': {
                    '-webkit-text-stroke': '1px white',
                    'color': 'transparent',
                },
            });
        },
    ]
}