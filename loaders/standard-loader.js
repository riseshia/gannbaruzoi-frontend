const linter = require('typescript-standard')

module.exports = function standardLoader (text) {
  this.cacheable()
  console.log(linter.lint())
  return text
}
