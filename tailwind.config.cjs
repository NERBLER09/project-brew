/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			spacing: {
				sm: '0.3125rem',
				md: '0.625rem',
				lg: '1.25rem',
				xl: '1.875rem',
				'2xl': '2.5rem'
			},
			colors: {
				white: '#ffffff',
				'accent-light': {
					DEFAULT: '#8D2BD6',
					hover: '#7021AB',
					disabled: '#A354DE',
					'disabled-text': '#C694EA'
				},
				grey: {
					100: '#F8F9FA',
					200: '#E9ECEF',
					300: '#DEE2E6',
					400: '#CED4DA',
					500: '#ADB5BD',
					600: '#6C757D',
					700: '#495057',
					800: '#343A40',
					900: '#212529'
				}
			}
		},
		fontSize: {
			sm: ['0.875rem', '1.125rem'],
			base: ['1rem', '1.375rem'],
			md: ['1.25rem', '2rem'],
			lg: ['1.75rem', '2.8125rem'],
			xl: ['2.5rem', '4rem'],
			'2xl': ['3rem', '5rem']
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
