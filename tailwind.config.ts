// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class','[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { brand: ['var(--font-brand)','system-ui','ui-sans-serif'] },
      colors: {
        base: {
          bg: 'var(--color-bg)',
          content: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)'
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)'
        }
      },
      boxShadow: {
        card: '0 1px 0 0 var(--color-border), 0 0 0 1px rgba(255,255,255,0.02) inset'
      },
      borderRadius: { xl: '14px', '2xl': '18px' }
    }
  },
  plugins: []
}
