const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/assets/styles/variables.scss" as *;`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: "http://117.135.142.254:8105/api" ,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
        ws: true,
        buffer: false, // 关键：关闭代理缓冲
        timeout: 0,
        proxyTimeout: 0,
        headers: {
          Accept: 'text/event-stream'
        }
         // 流式SSE长连接必填参数
        // proxyTimeout: 300000, // 5分钟超时，适配长流
        // timeout: 300000,
        // compress: false,
        // ws: true, // 开启websocket兼容，流式依赖
        // // 关键：删除冲突Connection请求头，代理自动处理keep-alive
        // onProxyReq: (proxyReq) => {
        //   proxyReq.removeHeader('Connection');
        //   proxyReq.removeHeader('Accept-Encoding');
        // },
        // // 解决本地OPTIONS预检400/跨域拦截
        // onProxyRes: (proxyRes, req, res) => {
        //   res.setHeader('Access-Control-Allow-Origin', '*');
        //   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        //   res.setHeader('Access-Control-Allow-Headers', 'authorization,Accept');
        //   // 流式必须暴露响应体，否则浏览器读不到chunked数据
        //   res.setHeader('Access-Control-Expose-Headers', '*');
        // }
      }
    }
  }
})
