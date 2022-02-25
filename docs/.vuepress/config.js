module.exports = {
  title: "william",
  description: "Just playing around",
  base: '/',
  repo: "https://githun.com/WilliamLiusHao/william-blog",
  head: [],
  plugins: [],
  themeConfig: {
    logo: "",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "文章",
        items: [
          { text: "日常", link: "/life/" }
        ],
      },
      { text: "掘金", link: "https://juejin.im/user/8451823770045" },
      { text: "GitHub", link: "https://github.com/ggwork" },
      { text: "学习", link: "/study/target" },
      { text: "女朋友", link: "/girlfriend/" }
    ],
    sidebar: {
      '/study/': [
        {
          title: '春起之苗',
          children: ['target']
        },
        {
          title: 'js基础',
          collapsable: true,
          children: [
            'base/extends',
            'base/proto',
            'base/scope',
            'base/new',
            'base/bind,call,apply',
            
          ]
        },
        {
          title: '手写系列',
          children: [
            'handwrite/promise',
            'handwrite/debounce&throttle',
            'handwrite/curry',
            'handwrite/typeof',
            'handwrite/cloneDeep',
          ]
        },
        {
          title: 'Vue',
          children: [
            'vue/computed&watch',
            'vue/nextTick',
            'vue/vue3',
          ]
        },
        'es6',
        'network',
        'browser',
        'optimization',
        'algorithm',
        {
          title: 'React',
          children: ['react/react']
        },
        'ts',
        'interview'
      ],
      '/life/': [{
        title: '生活琐事',
        children: [
          '/life/' // 表示读取更目录下的life文件夹，下的readme.md
        ]
      }],
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  }
};

