const colors = require('tailwindcss/colors')

module.exports = {
    purge: [],
    //darkMode: false, // or 'media' or 'class'
    darkMode: 'class',
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
                red: {
                    base: '#df3e3e'
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
                    dark: '#a43edf'
                }
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: colors.white,
            black: colors.black,
            gray: colors.coolGray,
            red: colors.red,
            green: colors.emerald,
            purple: colors.violet,
            pink: colors.pink
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
