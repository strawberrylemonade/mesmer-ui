const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      height: {
        '100': '28rem',
        'c-full': 'calc(100vh - 60px - 9rem)',
        'fit': 'fit-content'
      },
      minWidth: {
        '64': '16rem'
      },
      colors: {
        'poor-orange': '#ffa446',
        'mesmer-50': '#7cc3b80f',
        'mesmer-300': '#cbece9',
        'mesmer-400': '#7fc7bc',
        'mesmer-500': '#6ab3a7',
        'mesmer-600': '#57A397',
        'mesmer-700': '#32796e',
        'mesmer-800': '#202f28'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'main': '1fr 250px',
        'two-column': '300px 1fr'
      },
      animations: {
        'fadeUp': {
          from: {
            transform: 'translateY(30px)',
            opacity: 0
          },
          to: {
            transform: 'translateY(0)',
            opacity: 1
          },
        },
        'fadeIn': {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          },
        }
      },
      animationDuration: { // defaults to these values
        'default': '1s',
        '0.2s': '0.2s',
        'quick': '0.5s',
        '0s': '0s',
        '1s': '1s',
        '2s': '2s',
        '3s': '3s',
        '4s': '4s',
        '5s': '5s',
      },
      animationTimingFunction: { // defaults to these values
        'default': 'ease',
        'linear': 'linear',
        'ease': 'ease',
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      animationDelay: { // defaults to these values
        'default': '0s',
        '0s': '0s',
        '1s': '1s',
        '2s': '2s',
        '3s': '3s',
        '4s': '4s',
        '5s': '5s',
      },
      animationIterationCount: { // defaults to these values
        'default': 'infinite',
        'once': '1',
        'infinite': 'infinite',
      },
      animationDirection: { // defaults to these values
        'default': 'normal',
        'normal': 'normal',
        'reverse': 'reverse',
        'alternate': 'alternate',
        'alternate-reverse': 'alternate-reverse',
      },
      animationFillMode: { // defaults to these values
        'default': 'none',
        'none': 'none',
        'forwards': 'forwards',
        'backwards': 'backwards',
        'both': 'both',
      },
      animationPlayState: { // defaults to these values
        'running': 'running',
        'paused': 'paused',
      },
    }
  },
  variants: { // all the following default to ['responsive']
    animations: ['responsive'],
    animationDuration: ['responsive'],
    animationTimingFunction: ['responsive'],
    animationDelay: ['responsive'],
    animationIterationCount: ['responsive'],
    animationDirection: ['responsive'],
    animationFillMode: ['responsive'],
    animationPlayState: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-animations')
  ],
}
