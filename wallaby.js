module.exports = function (wallaby) {
  return {
    files: ['src/**/*', '!src/**/__tests__/**/*', 'package.json', '.babelrc'],

    tests: ['src/**/__tests__/*-test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    },

    setup: function (wallaby) {
      var jestConfig = require('./package.json').jest
      if (!jestConfig.globals) {
        jestConfig.globals = {}
      }
      jestConfig.moduleNameMapper = {
        '^@/(.*)$': wallaby.projectCacheDir + '/src/$1'
      }
      jestConfig.globals['__DEV__'] = true
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
    debug: true
  }
}
