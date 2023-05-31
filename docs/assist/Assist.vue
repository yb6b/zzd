<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { fetchMb, Db } from "./fetchMb";
import Main from "./Main.vue";

const mb: Ref<Db | undefined> = ref();
onMounted(() => {
  fetchMb().then((v) => (mb.value = v));
});
</script>

<template>
  <div
    style="text-align: center; color: grey"
    v-if="typeof mb === 'undefined'"
  >
    正在加载哲豆码表……
  </div>
  <Main v-else :mb="mb" />
</template>
