const path = require('path');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/style/theme.less'), 'utf8'));

module.exports = {
  entry: {
    src: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/build',
    contentBase: path.resolve(__dirname, './public'),
    proxy: {
      '/api': 'http://localhost:3000/',
    },
    historyApiFallback: true,
    hot: true,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['import', { libraryName: 'antd', style: true }]],
          },
        },
      },
      {
        test: /.(css|scss|sass)$/,
        exclude: /node_modules(?!\/antd)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          // ,
          // {
          //   loader: 'less-loader', // compiles Less to CSS
          //   options: {
          //     lessOptions: {
          //       // If you are using less-loader@5 please spread the lessOptions to options directly
          //       modifyVars: {
          //         'primary-color': '#A294F6',
          //         'link-color': '#1890ff',
          //         'success-color': '#52c41a',
          //         'warning-color': '#faad14',
          //         'error-color': '#f5222d',
          //         'font-size-base': '14px',
          //         'heading-color': 'rgba(0, 0, 0, 0.85)',
          //         'text-color': 'rgba(0, 0, 0, 0.65)',
          //         'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
          //         'disabled-color': 'rgba(0, 0, 0, 0.25)',
          //         'border-radius-base': '4px',
          //         'border-color-base': '#d9d9d9',
          //         'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
          //       },
          //       javascriptEnabled: true,
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: themeVariables,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  plugins: [new Dotenv()],
};
