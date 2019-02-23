module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: process.env.VUE_APP_viewportWidth, // 视窗的宽度
      viewportHeight: process.env.VUE_APP_viewportHeight, // 视窗的高度
      unitPrecision: process.env.VUE_APP_unitPrecision, //  小数点位数
      minPixelValue: process.env.VUE_APP_minPixelValue, // 小于或等于`1px`不转换
      mediaQuery: process.env.VUE_APP_mediaQuery // 允许在媒体查询中转换`px`
    }
  }
};
