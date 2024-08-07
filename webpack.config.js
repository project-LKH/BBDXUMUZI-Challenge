const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: 'production',
  entry: { main: path.resolve(__dirname, "src", "index.js") },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.WEATHER_KEY": JSON.stringify(
        process.env.WEATHER_KEY
      ),
    }),
  ],
};
