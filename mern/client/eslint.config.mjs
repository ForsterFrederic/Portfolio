import { defineConfig } from 'eslint-define-config';
import eslintConfigAirbnb from 'eslint-config-airbnb';
import pluginReact from 'eslint-plugin-react';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';

export default defineConfig([
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        module: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'warn',
    },
  },
  eslintConfigAirbnb.rules,
]);
