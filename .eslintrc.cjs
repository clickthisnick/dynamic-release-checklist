module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: ["dist", "lib", "webpack.config.js", "src/checklistfn.ts"],
    root: true,
  };
