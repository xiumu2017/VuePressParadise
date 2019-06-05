const utils = require('./utils')

console.log(">>> start vue pressing... ");

module.exports = {
  title: 'Paradise VuePress',
  description: 'Paradise Blog By VuePress',
  head: [
    // 增加一个自定义的favicon
    ['link', { 'rel': 'icon', 'href': '/image/1.ico' }]
  ],
  themeConfig: {
    nav: [
      {
        text: 'Paradise',
        link: '/'
      },
      {
        text: '语雀',
        link: 'https://www.yuque.com/paradise'
      },
      {
        text: '生活',
        link: '/life/'
      },
      {
        text: 'Java',
        link: '/java/'
      },
      {
        text: 'Tools',
        items: [
          { text : 'ProcessOn', link: 'https://www.processon.com/view/5ce2125de4b00446dc6b133b'},
          { text : '幕布', link: 'https://mubu.com/doc/bU5zO0Fos6'},
          { text : '滴答清单', link: 'https://dida365.com/#q/all/tasks'},
          { text : '极客时间', link: 'https://account.geekbang.org/dashboard/buy'},
        ]
      }
    ],
    sidebar: utils.inferSiderbars(),
    // lastUpdated: 'Last update',
    repo: 'xiumu2017',
    editLinks: true,
    // docsDir: 'docs',
    // editLinkText: 'edit in GitHub',
    sidebarDepth: 2
  },
  ga: 'UA-109340118-1',
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
