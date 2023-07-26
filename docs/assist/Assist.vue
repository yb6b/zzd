<script setup lang="ts">
import { ref, onMounted, Ref, shallowReactive } from "vue";
import { fetchMb, Db } from "./fetchMb";
import Main from "./Main.vue";

const mb: Ref<Db | undefined> = ref();
const showProgress = ref(false);
const downloadProgress = shallowReactive({
  max: 0,
  current: 0,
});
onMounted(() => {
  setTimeout(() => {
    showProgress.value = true;
  }, 300);
  fetchMb(downloadProgress).then((v) => (mb.value = v));
});
</script>

<template>
  <div style="text-align: center; color: grey" v-if="typeof mb === 'undefined'">
    <div v-show="showProgress">
      正在加载哲豆码表……
      <br />
      <progress :max="downloadProgress.max" :value="downloadProgress.current" />
    </div>
  </div>
  <Main v-else :mb="mb" />
</template>
