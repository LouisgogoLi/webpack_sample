// 引用 node.js 裡面的路徑（path）模組，在下面會用到
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    hot: true, // 開啟 HMR 支持
  },
  // 設定進入點的檔案路徑和檔名
  entry: "./src/index.js",
  // 設定輸出點
  output: {
    // 設定路徑，這邊使用到剛剛宣告的 path，__dirname 可以取得這個專案資料夾的完整絕對路徑
    //dist 名稱可以自行更改，也可以空值（''），就會放到專案資料夾第一層（通常不會去改動他）
    path: path.resolve(__dirname, "dist"),
    // 設定檔名，常見的輸出檔名為 main.js 或 bundle.js，可以自行更改
    filename: "main.[hash].js",
    //清除 dist 資料夾
    clean: true,
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        // 用正則表示法來處理副檔名是 .css 的檔案
        test: /\.css$|\.scss$/i,
        use: [
          // 這邊原本使用的是 style.loader，變更為 MiniCssExtractPlugin.loader
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // 設置在 css-loader 前應用的 loader 數量
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // 在 HtmlWebpackPlugin() 裡面放入物件，並設置 template 屬性為來源檔案路徑
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash].css",
    }),
  ],
};
