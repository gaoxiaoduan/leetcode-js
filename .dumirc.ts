import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/leetcode-js/', // 文档起始路由
  publicPath: '/leetcode-js/', // 静态资源起始路径
  favicons: ['/leetcode-js/favicon.ico'],
  themeConfig: {
    name: 'leetcode-js',
    logo: '/leetcode-js/logo.png',
    footer: ' 💫 keep awake 💫',
  },
  hash: true, // 开启 hash 模式，让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存
});
