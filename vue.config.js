module.exports = {
    //11-14
    //反向代理
    devServer: {
        open: true,
        host: 'localhost',
        port: 8082,
        https: false,
        hotOnly: false,
        proxy: {
            //配置跨域
            '/api': {
                target: 'https://vuets-api.herokuapp.com/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}