const path = require('path');

module.exports = {
  entry: {
    main: './js/scripts.js' // Ponto de entrada do projeto
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // Nome do arquivo de saída
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname), // Serve arquivos estáticos da raiz do projeto
    compress: true,
    port: 9000 // Porta para o servidor de desenvolvimento
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Processa arquivos .js
        exclude: /node_modules/, // Exclui node_modules (opcional, mas comum)
        use: {
          loader: 'babel-loader' // Usa babel para transpilação
        }
      }
    ]
  }
};