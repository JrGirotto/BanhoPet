const path = require('path');

module.exports = {
  entry: {
    main: "./js/scripts.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname),
      publicPath: "/",
    },
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"], // Garante que o Webpack resolva arquivos .js
    alias: {
      imask: path.resolve(__dirname, "node_modules/imask"), // Garante que o IMask seja resolvido corretamente
    },
  },
};