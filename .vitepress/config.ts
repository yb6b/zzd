import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/zzd/',
  lang: 'zh-cn',
  title: "哲豆音形",
  description: "简单、顺手、成熟的两笔输入法。",
  head: [
    ['link', {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/zzd-logo.svg',
    }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/zzd-logo.svg",
    siteTitle: '哲豆音形',
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/markdown-examples' },
      { text: '反查', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '说明',
        items: [
          { text: '单字输入', link: '/markdown-examples' },
          { text: '词语输入', link: '/markdown-examples' },
          { text: '符号输入', link: '/markdown-examples' },
          { text: '拆分', link: '/api-examples' },
          { text: '感谢', link: '/api-examples' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yb6b/zzd' }
    ],

    footer: {
      message: '本网站遵循 Apache-v2 开源协议',
      copyright: 'Copyright © 2023-present yb6b',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    darkModeSwitchLabel: '夜间模式',

    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonAriaLabel: '搜索',
            buttonText: '搜索标题'
          },
          modal: {
            displayDetails: '详细展示',
            resetButtonTitle: '清空',
            noResultsText: '搜索不到，换个关键词',
            backButtonTitle: '返回',
            footer: {
              selectText: '选择',
              navigateText: '浏览',
              navigateDownKeyAriaLabel: '下键',
              navigateUpKeyAriaLabel: '上键',
              closeKeyAriaLabel: '关闭',
              closeText: '取消搜索',
            }
          },
        }
      }
    }

  }
})
