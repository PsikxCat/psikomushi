import baseConfig from '../.prettierrc.cjs'

const config = {
  ...baseConfig,
  printWidth: 110,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
