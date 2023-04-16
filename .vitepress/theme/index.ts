// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import './style.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
