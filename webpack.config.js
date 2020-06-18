const path = require('path');

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
          },
        },
      },
      {
        test: /.(css|scss|sass)$/,
        exclude: /node_modules(?!\/antd)/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'less-loader'],
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
            // options: {
            //   lessOptions: {
            //     // If you are using less-loader@5 please spread the lessOptions to options directly
            //     modifyVars: {
            //       'primary-color': '#1DA57A',
            //       'link-color': '#1DA57A',
            //       'border-radius-base': '2px',
            //     },
            //     javascriptEnabled: true,
            //   },
            // },
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
};
