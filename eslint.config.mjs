import nextPlugin from 'eslint-config-next';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', '.vercel/**'],
  },
  ...nextPlugin,
];
