module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,mjs,jsx,ts,tsx,svelte}', './public/index.html'],
	safelist: [],
	// whitelistPatterns: [/svelte-/],
	theme: {
		extend: {
			padding: {
				'100px': '100px'
			},
			spacing: {
				'100px': '100px'
			}
		}
	},
	daisyui: {
		logs: false
	},
	plugins: [require('daisyui')]
};
