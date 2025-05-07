module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off', // Tắt rule của ESLint và sử dụng rule của TypeScript
    },
  };