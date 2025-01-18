// eslint.config.js
import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu(
  {
    typescript: {
      overrides: {
        'no-irregular-whitespace': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-imports': 'off',
        'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
      },
    },
    vue: {
      overrides: {
        'vue/no-irregular-whitespace': 'off',
        'vue/no-unused-refs': 'off', // Закрыть временно, дождитесь слияния ветви Vue-Lint
        'vue/no-reserved-component-names': 'off',
        'vue/component-definition-name-casing': 'off',
      },
    },
  },
)
