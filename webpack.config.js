
const path = require('path');// подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем mini-css-extract-plugin

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [// rules — это массив правил
    // добавим в него объект правил для бабеля
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|woff2|woff)$/,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'// путь к файлу index.html
    }),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
};
