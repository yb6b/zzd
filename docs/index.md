---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: 首页
description: 哲豆音型两笔输入法介绍。

hero:
  name: 哲豆音形
  text: 两笔输入法
  tagline: 二十年坚持更新
  image: /zzd-logo.svg
  actions:
    - theme: brand
      text: 开始学习
      link: /guide/
    - theme: alt
      text: 反查
      link: /assist/
    - theme: alt
      text: 下载
      link: http://zzdzzd.ysepan.com/


features:
  - title: 易学顺手
    details: 字根少，规则简洁且规范，半小时入门。优秀的互击率和小指负荷。
    link: /guide/
    linkText: 教程

  - title: 成熟词库
    details: 13万超大词库。多而不废。
    link: /assist/
    linkText: 词条反查

  - title: 常年更新
    details: 及时更新词库、修正错误。字斟句酌，精益求精。
    link: /changelog/
    linkText: 更新历史

  - title: 加入我们
    details: 活跃的QQ群：101675326
    link: /join/
    linkText: 联系方式
---
<script setup>
import {onMounted} from 'vue'
onMounted(()=>{
  const img = document.querySelector('img.VPImage.image-src')
  img.style.height = '8rem'
})
</script>