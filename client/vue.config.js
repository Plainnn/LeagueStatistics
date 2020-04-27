const path = require('path')

module.exports = {
  devServer: {
    outputDir: path.resolve(__dirname, '../server/public'),
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ['vuetify']
};
