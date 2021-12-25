const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },

  plugins: [require('tailwindcss-touch')()],
}

module.exports = config
