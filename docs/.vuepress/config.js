const utils = require('./utils')

console.log(">>> start vue pressing... ");
console.log(JSON.stringify(utils.inferSiderbars()));

module.exports = {
  theme: 'reco',
  host: '0.0.0.0', // 指定 dev server 的主机名
  port: '8888', // 指定 dev server 的端口
  // dest: '.vuepress/dist', // 指定vuepress build 的目录
  // ga: 'UA-109340118-1', // 提供一个 Google Analytics ID 来使 GA 生效。
  title: 'Paradise VuePress',
  referrer: 'no-referrer',
  description: 'Paradise Blog By VuePress',
  head: [
    // 增加一个自定义的favicon
    ['link', { 'rel': 'icon', 'href': '/image/1.ico' }]
  ],
  themeConfig: {
    valineConfig: {
      appId: 'WUFWbYfENCxekFsvakRqGJo9-gzGzoHsz',// your appId
      appKey: 'koa6TbPuEUc1fjnyW0v6R0PM', // your appKey
    },
    blogConfig: {
      category: {
        location: 3,
        text: 'Category'
      },
      tag: {
        location: 4,
        text: 'Tag'
      }
    },
    nav: [
      {
        text: '时间轴',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: 'Book',
        link: '/book/',
        icon: 'reco-douyin'
      },
      {
        text: '语雀',
        link: 'https://www.yuque.com/paradise',
        icon: 'reco-twitter'
      }
    ],
     // sidebar: utils.inferSiderbars(),
    sidebar: {
      "/life/": [{ "title": "生活", "children": ["", "fish", "hf", "nj"], "collapsable": true }]
    },
    lastUpdated: 'Last Updated', // string | boolean
    repo: 'xiumu2017/VuePressParadise',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '飞鸿踏雪泥',
    sidebarDepth: 1,
    displayAllHeaders: false, // 默认值：false 显示所有页面的标题链接 
    record: '皖ICP备20002272号',
    startYear: '2018',
    author: 'Paradise', // 全局作者
    authorAvatar: '/image/avatar.jpg', // 首页头像
    type: 'blog',
  },
  markdown: {
    lineNumbers: true,
    config: md => {
      md.use(require('markdown-it-include'))
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': './public/images'
      }
    }
  }
};
