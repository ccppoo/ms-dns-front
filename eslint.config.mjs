import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/dist', 'node_modules/*', '**/tsconfig.*', '*.config.ts', 'routeTree.gen.ts'],
  },
  ...fixupConfigRules(
    compat.extends('eslint:recommended', 'react-app', 'plugin:react/jsx-runtime', 'prettier'),
  ),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: true,
        tsconfigRootDir: './',
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          fixStyle: 'separate-type-imports',
        },
      ],

      '@typescript-eslint/no-restricted-imports': [
        2,
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useStore', 'useDispatch'],
              message: 'Please use pre-typed versions from `src/app/hooks/index.ts` instead.',
            },
          ],
        },
      ],

      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: true,
          allowAnonymousClass: false,
          allowAnonymousFunction: true,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{c,m,}{t,j}s', '**/*.{t,j}sx'],
  },
  {
    files: ['**/*{test,spec}.{t,j}s?(x)'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
