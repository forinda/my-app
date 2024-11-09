// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

// const rules:typeof eslint.configs.recommended.rules ={}
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        },
        {
          blankLine: 'always',
          prev: ['case', 'default', 'export'],
          next: '*'
        },
        // class members
        {
          blankLine: 'always',
          prev: '*',
          next: ['class', 'function', 'if', 'switch']
        }
      ]
    },
    files: ['src/**/*.ts'],
    ignores: ['dist/', 'node_modules', 'coverage']
  }
);
