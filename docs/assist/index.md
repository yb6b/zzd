---
layout: doc
sidebar: false
aside: false
---
<script setup>
import Assist from "./Assist.vue"
</script>

# 反查 
在输入框里填写字词，会展示圆满版里相应的编码。按小小码表里词条的顺序。
<Suspense>
<Assist />
<template #fallback>
<div style="text-align:center; color: gray; font-size:small;">加载码表……</div>
</template>
</Suspense>
