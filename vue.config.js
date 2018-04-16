module.exports = {
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-loader')
      .loader('graphql-tag/loader')
  },

  lintOnSave: false,
}
