const path = require("path");
const dotenv = require("dotenv");
const { defineConfig } = require("@vue/cli-service");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

module.exports = defineConfig({
  transpileDependencies: true,
});
