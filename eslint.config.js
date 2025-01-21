import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import parser from '@typescript-eslint/parser'
import auto from 'eslint-config-canonical/configurations/auto.js'
import sonar from 'eslint-plugin-sonarjs'
import tailwind from 'eslint-plugin-tailwindcss'

import reactPlugin from 'eslint-plugin-react'
export default tseslint.config(
  ...auto,
  {
    ignores: [
      '**/build',
      '**/.react-router',
      '**/*.config.{js,ts}',
      '**/*.d.ts',
      '**/*.json',
      '**/*.yaml',
      '**/unimport.d.ts',
    ],
  },
  {
    extends: [
      reactPlugin.configs.flat.recommended,
      js.configs.recommended,
      // ...tseslint.configs.recommended,
      ...tailwind.configs['flat/recommended'],
      sonar.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parser,
      parserOptions: {
        projectService: {
          defaultProject: './tsconfig.json',
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@stylistic/semi': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'no-undef': 'off',
      'prettier/prettier': 'off',
      'canonical/filename-match-exported': 'off',
      'func-style': 'off',
      'canonical/filename-match-regex': 'off',
      'react/function-component-definition': 'off',
      'canonical/id-match': 'off',
      'react/jsx-no-undef': 'off',
      'import/no-unassigned-import': 'off',
      'import/extensions': 'off',
      'react/forbid-component-props': 'off',
      'react-refresh/only-export-components': 'off',
      'id-length': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }
)
