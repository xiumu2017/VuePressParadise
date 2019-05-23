const utils = require('./utils')

console.log(JSON.stringify(utils.inferSiderbars()));

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
        link: '/yueque/'
      },
      {
        text: '生活',
        link: '/life/'
      },
      {
        text: '极客时间',
        link: '/jk/'
      },
      {
        text: 'GitHub',
        items: [
          { text : 'Github首页1', link: '/1/'},
          { text : 'Github首页2', link: '/2/'},
          { text : 'Github首页3', link: '/3/'},
        ]
      }
    ],
    sidebar: utils.inferSiderbars(),
    // lastUpdated: 'Last update',
    // repo: 'xiumu2017/github.xiumu2017.io',
    // editLinks: true,
    // docsDir: 'docs',
    // editLinkText: 'edit in GitHub',
    sidebarDepth: 3
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
