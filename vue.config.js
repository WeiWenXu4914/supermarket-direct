const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const Timestamp = new Date().getTime();
module.exports = {
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: { // 实时保存、编译的配置段
    open: true, // 自动开启浏览器
    port: 8080 // 服务运行端口
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    externals: {
      'AMap': 'AMap',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex'
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    },
  },
}