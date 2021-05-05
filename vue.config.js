let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    target: 'https://www.wanandroid.com',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/'
    }
}

module.exports = {
    devServer: {
        port: 8080,
        proxy: proxyObj
    },
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 直接覆盖变量
                        'sidebar-selected-border-color': '#fe6243',
                    },
                },
            },
        },
    },
}