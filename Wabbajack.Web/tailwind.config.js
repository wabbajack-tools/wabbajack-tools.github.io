const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            "title": ["Montserrat"],
            "subtitle": ["Overpass"]
        },
        extend: {
            screens: {
                '3xl': '1930px'
            },
            colors: {
                wabbajack: {
                    green: colors.emerald["600"],
                    red: '#df3e3e',
                    purple: '#a43edf',
                    background: '#1f1b24'
                },
                black: {
                    900: '#000000',
                    800: '#1d1d1d',
                    700: '#2c2c2c',
                    600: '#3b3b3b',
                    500: '#4a4a4a'
                },
                purple: {
                    light: '#c76efb',
                }
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: colors.white,
            black: colors.black,
            gray: colors.coolGray,
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
