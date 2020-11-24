module.exports = {
    // 代理
    devServer: {
        port: 8080,
        proxy: {
            [process.env.VUE_APP_0_URL]: { // 
                target: 'http://124.71.140.59:8080/',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_0_URL]: ''
                }
            },
            [process.env.VUE_APP_1_URL]: { // 胡哥
                target: 'https://dev.wx.hmyccd.com/api/dataView', 
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_1_URL]: ''
                }
            },
            [process.env.VUE_APP_2_URL]: { // 飞哥
                target: 'http://124.71.140.59:8082/static/',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_2_URL]: ''
                }
            },
            [process.env.VUE_APP_3_URL]: { // 监控视频流
                target: 'http://116.63.174.137:8159',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_3_URL]: ''
                }
            },
            [process.env.VUE_APP_4_URL]: { // 运维牛
                target: 'https://device.webizz.cn',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_4_URL]: ''
                }
            },
            [process.env.VUE_APP_5_URL]: { // 胡哥2
                target: 'https://dev.wx.hmyccd.com/apistreet/dataView', 
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    ['^' + process.env.VUE_APP_5_URL]: ''
                }
            },
        }
    },
    configureWebpack: {
        externals: {
            'AMap':'AMap' //高德地图配置
        }
    }
}