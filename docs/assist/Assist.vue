<script setup lang="ts">
import { ref, onMounted, shallowReactive } from "vue";
import { fetchMb, InvertedMap, invertMabiao } from "./fetchMb";
import Main from "./Main.vue";

const showProgress = ref(false);
const done = ref(false);

let mb: InvertedMap;

const downloadProgress = shallowReactive({
  max: 0,
  current: 0,
});

onMounted(() => {
  setTimeout(() => {
    showProgress.value = true;
  }, 300);

  fetchMb(downloadProgress).then((v) => {
    mb = invertMabiao(v);
    done.value = true;
  });
});
</script>

<template>
  <div style="text-align: center; color: grey" v-if="!done">
    <div v-show="showProgress">
      正在加载哲豆码表……
      <br />
      <progress class="progress progress-primary" :max="downloadProgress.max" :value="downloadProgress.current" />
    </div>
  </div>
  <Main v-else :mb="mb" />
</template>
