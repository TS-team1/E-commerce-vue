const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // إزالة الإعداد الافتراضي لـ SVG
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();

    // إضافة vue-svg-loader لتحميل SVG
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");

    // إعداد polyfills
    config.resolve.fallback = {
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    };
  },
});
