import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

export default [
  // Base JavaScript recommendations
  js.configs.recommended,

  // Configuration for JavaScript files
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    rules: {
      // Basic JavaScript rules
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-undef': 'off', // Let TypeScript handle this
    },
  },

  // Configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    rules: {
      // TypeScript handles unused variables and undefined references
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },

  // Ignore common directories
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '.cache/**',
      'public/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
];
