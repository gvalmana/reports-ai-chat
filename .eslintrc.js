module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        trailingComma: 'es5',
        singleQuote: true,
        arrowParens: 'avoid',
        printWidth: 100,
        tabWidth: 2,
        // Eliminar si se quiere usar un específico Final de Línea
        endOfLine: 'auto',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-setup-uses-vars': 'error',
    //Eliminar si se desea que typescript sea mas estricto
    '@typescript-eslint/no-inferrable-types': 'off',

    // vue rules
    'vue/valid-v-slot': 'warn',
    'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped', 'module'] }],
    // 'vue-scoped-css/require-v-deep-argument': 'off',

    'no-var': 'error',
  },
}
