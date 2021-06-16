const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },

  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    port: 8081, //本地localhost端口
    proxy: { //设置代理，可解决跨域
      "/dev_api": {
        target: "http://localhost:3030",
        pathRewrite: { "^/dev_api": "" },
        changeOrigin: true
      }
    }
  },
  runtimeCompiler: false // true:完整编译，运行时编译
}
