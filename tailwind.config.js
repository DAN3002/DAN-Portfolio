/** @type {import('tailwindcss').Config} */
// Tailwind CSS v3 config.
// We use v3 (not v4) because Create React App / react-scripts 5 ships PostCSS 8
// and does NOT cleanly support Tailwind v4's new `@import "tailwindcss"` / Lightning
// CSS pipeline. v3's classic `@tailwind base/components/utilities` directives work
// out-of-the-box with CRA's PostCSS setup.
//
// IMPORTANT: This file is the single source of truth for shared design tokens
// (colors / fonts / breakpoints). They are ported from the original template CSS
// in `public/css/style.css` and `src/styles/*` so the dark theme + red/gold accent
// look is preserved exactly during the migration.
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./public/index.html',
	],
	// We scope Tailwind's preflight off so it does NOT reset the existing
	// jQuery template (bootstrap/style.css) typography & layout during migration.
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			colors: {
				// Brand accents (ported from public/css/style.css + src/styles/*)
				accent: {
					DEFAULT: '#FF4C60', // primary red — buttons, active states
					hover: '#d63d4f',
				},
				gold: {
					DEFAULT: '#FFD15C', // secondary gold — links, tags, headings
				},
				teal: '#44D7B6',
				indigo: '#6C6CE5',
				// Dark surfaces
				surface: {
					DEFAULT: '#302f4e', // card background
					light: '#3a3a5e', // card hover
					alt: '#2a2a45', // alternate hover
					button: '#454360', // muted button background
					'button-hover': '#5a5a7a',
				},
				page: {
					DEFAULT: '#353353', // body background (.dark)
					deep: '#22223b', // deepest background
				},
				ink: '#454360', // default body text color in template
			},
			fontFamily: {
				sans: ['Rubik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				card: '0 2px 4px rgba(0, 0, 0, 0.1)',
				'card-hover': '0 8px 24px rgba(0, 0, 0, 0.25)',
				accent: '0 5px 15px rgba(255, 76, 96, 0.3)',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: '0', transform: 'translateX(20px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				fadeOut: {
					from: { opacity: '1', transform: 'translateX(0)' },
					to: { opacity: '0', transform: 'translateX(-20px)' },
				},
			},
			animation: {
				'list-in': 'fadeIn 0.3s ease-in-out',
				'list-out': 'fadeOut 0.3s ease-in-out',
			},
		},
		screens: {
			// Match Bootstrap's breakpoints used by the existing template/grid
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px',
		},
	},
	plugins: [],
};
