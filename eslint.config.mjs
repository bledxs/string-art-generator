import nextPlugin from 'eslint-config-next';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', '.vercel/**'],
  },
  ...nextPlugin,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'off',
      'jsx-a11y/alt-text': 'warn',
      '@next/next/no-img-element': 'warn',
    },
  },
];
