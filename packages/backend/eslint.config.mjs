// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

// const rules:typeof eslint.configs.recommended.rules ={}
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'max-lines': [
        'warn',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }
      ],

      'max-depth': ['warn', 4],

      'max-lines-per-function': [
        'warn',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }
      ],

      'max-params': ['warn', 5],
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
        }
      ],

      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/array-type': 'warn'
    },
    files: ['src/**/*.ts'],
    ignores: ['dist/', 'node_modules', 'coverage'],
    plugins: {
      
    }
  }
);
