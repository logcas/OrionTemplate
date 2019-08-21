module.exports = {
    // 是否启用eslint
    useESLint: true,
    // 是否启用px2rem，自动把px转化为rem（移动端）
    usePx2rem: false,
    // px2rem自定义配置
    // see more: https://github.com/cuth/postcss-pxtorem
    px2remConfig: {},
    // 开发环境相关设置
    dev: {
        // axios 请求中的 baseUrl
        // 设置为 false 时不启用
        baseUrl: false,
        // 自定义的webpack配置，会自动合并
        webpackConfig: {}
    },
    // 生产环境相关设置
    prod: {
        // 同上
        baseUrl: 'http://www.qq.com',
        webpackConfig: {}
    }
};
