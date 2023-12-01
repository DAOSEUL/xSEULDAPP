/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				white: 'hsl(0, 0%, 100%)',
				offWhite: 'hsl(20, 33%, 98%)',
				beige: 'hsl(26, 21%, 94%)',
				mediumGrey: 'hsl(230, 21%, 65%)',
				green: 'hsl(114, 31%, 63%)',
				green25: 'hsla(114, 31%, 63%, 0.25)',
				green50: 'hsla(114, 31%, 63%, 0.5)',
				green75: 'hsla(114, 35%, 63%, 0.75)',
				darkGreen: 'hsl(114, 52%, 20%)',
				blue: 'hsl(216, 54%, 56%)',
				darkBlue: 'hsl(230, 24%, 29%)',
				darkBlue50: 'hsla(230, 24%, 29%, 0.5)',
				darkBlue75: 'hsla(230, 24%, 29%, 0.75)',
				orange: 'hsl(24, 91%, 65%)',
				red: 'hsla(0, 100%, 74%, 1)',
				red25: 'hsla(0, 100%, 74%, 0.25)',
				darkRed: 'hsla(0, 56%, 39%, 1)'
			},
			fontFamily: {
				base: '"IBM Plex Sans", -apple-system, sans-serif',
			},
		},
	},
	plugins: [require('prettier-plugin-tailwindcss')],
};
