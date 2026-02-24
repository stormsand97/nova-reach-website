/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1A2F25', // Deep Forest Green (Trust)
                accent: '#D36B42',  // Terracotta (Action)
                background: '#F2EBE5', // Cream (Warmth)
                textDark: '#1A1C1A',  // Charcoal
            },
            fontFamily: {
                heading: ['"Space Grotesk"', 'sans-serif'],
                drama: ['"Cormorant Garamond"', 'serif'],
                data: ['"Space Mono"', 'monospace'],
                sans: ['"Inter"', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [],
}
