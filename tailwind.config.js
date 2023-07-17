/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
	// important: '#root',
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Figtree", "sans-serif"], // duplicate untill re-structured
				figtree: ["Figtree", "sans-serif"],
			},
			colors: {
				danger: "#d14f4f",
				success: "#03b54a",
				warning: "#f1c40f",
				primary: "#2472fc",
				"title-color": "#444444",
				"desc-color": "#848484",
				"success-bg": "#EBFBF6",
				"error-bg": "#FDEDEE",
				"warning-bg": "#FFF9E9",
				"text-gray": "#71757B",

				dark: {
					100: "#E6E6E6", //Border or Background color
					200: "#E8EAED",
					300: "#BDC1C6",
					400: "#80868B",
					500: "#5F6368",
					600: "#2E3134",
					700: "#282A2D",
					800: "#17181B",
					900: "#0E1013",
				},
				theme: {
					DEFAULT: "#2472FC", //Default theme color
				},
			},
			fontWeight: {
				normal: 400,
				medium: 500,
				semiBold: 600,
				bold: 700,
			},
			boxShadow: {
				light: "0px 0px 29px rgba(0, 0, 0, 0.09)",
			},
			borderRadius: {
				DEFAULT: "8px",
			},
		},
		container: {
			center: true,
			padding: "1rem",
		},
		screens: {
			xxs: "370px",
			xs: "480px",
			sm: "576px",
			md: "767px",
			lg: "992px",
			xlg: "1024px",
			xl: "1200px",
			xxl: "1440px",
			"3xl": "1536px",
			"4xl": "1600px",
		},
	},
	plugins: [],
};
