// CLI配置项
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.entry.app = './src/index.js'
    }
  },
  lintOnSave: false, // eslint
  devServer: {
    proxy: 'http://localhost:9000',
    port: 9000
  }
}