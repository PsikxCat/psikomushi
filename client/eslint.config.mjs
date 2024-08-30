import { fileURLToPath } from 'url'
import path from 'path'
import reactRefresh from 'eslint-plugin-react-refresh'
import rootConfig from '../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  ...rootConfig,
  {
    files: [path.resolve(__dirname, '**/*.{ts,tsx}')],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
]
