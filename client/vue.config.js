module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',
  devServer: {
    compress: true,
    proxy: {
      '/api': {
        target: 'http://51.38.131.220:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ['vuetify']
};
