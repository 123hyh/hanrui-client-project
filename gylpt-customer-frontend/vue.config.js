const isProd = process.env.NODE_ENV == 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    if(isProd){
      config.plugins.delete('prefetch').delete('preload')
    }
  },
  configureWebpack: config => {
    if(isProd){
      config.plugins.push( new CompressionWebpackPlugin({
        test: /\.(js|html|css)$/,
        // asset: '[path].gz[query]',
        threshold: 25600,
        minRatio: 0.9
    }));
    }
  },
  devServer: {
    proxy: {
      '/service': {
        // target: 'http://47.107.253.252:8083/customer', // 线上
        target: 'http://192.168.0.104:8083/customer', // 朋建
        // target: 'http://192.168.0.200:8083/customer', //郭工
        changeOrigin: true,
        pathRewrite:{
          '/service': ''
        }
      }
    }
  }
}