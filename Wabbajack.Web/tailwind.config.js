const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./**/*.razor",
        "./**/*.cshtml",
        "./**/*.html"
    ],
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
                    red: '#992a2a',
                    purple: {
                        dark :'#8866ad',
                        light: '#d8baf8'
                    },
                    background: {
                        dark : '#2a2b41',
                        darker : '#222531'
                    },
                    cards: {
                        background: {
                            base : '#3c3652',
                            hover : '#4e4571'
                        }
                    }
                },
                black: {
                    900: '#000000',
                    800: '#1d1d1d',
                    700: '#2c2c2c',
                    600: '#3b3b3b',
                    500: '#4a4a4a'
                },
                purple: {
                    light: '#8866ad',
                }
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: colors.white,
            black: colors.black,
            gray: colors.gray,
        }
    },
    plugins: [],
}
