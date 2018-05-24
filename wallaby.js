module.exports = wallaby => {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

  const compiler = wallaby.compilers.babel({
    presets: [
      ['@vue/app', { modules: 'commonjs' }],
      [
        '@babel/preset-stage-1',
        {
          decoratorsLegacy: true,
        },
      ],
    ],
  })

  return {
    files: ['src/**/*', 'jest.config.js', 'package.json'],

    tests: ['tests/**/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js': compiler,
      '**/*.vue': require('wallaby-vue-compiler')(compiler),
    },

    preprocessors: {
      '**/*.vue': file => require('vue-jest').process(file.content, file.path),
    },

    setup: function(wallaby) {
      const jestConfig = require('./package').jest || require('./jest.config')
      delete jestConfig.transform['^.+\\.vue$']
      delete jestConfig.transform['^.+\\.jsx?$']
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',

    debug: true,
  }
}
