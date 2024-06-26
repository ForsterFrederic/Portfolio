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
        }
    ]
}