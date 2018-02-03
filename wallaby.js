module.exports = function (wallaby) {
  return {
    files: ['src/**/*', '!src/**/__tests__/**/*', 'package.json'],

    tests: ['src/**/__tests__/*-test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    },

    preprocessors: {
      '**/*.vue': file => require('jest-vue-preprocessor').process(file.content, file.path)
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
      delete jestConfig.transform['\\.vue$']
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
    debug: true
  }
}
