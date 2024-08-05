const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static'),
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },

      { // html
        test: /\.html$/i,
        use: ['html-loader'],
      },

      { // CSS
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      }

    ]
  }
};
