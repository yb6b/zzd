<script setup lang="ts">
import { ref, onMounted } from "vue";
import ShowTable from "./ShowTable.vue";
import type { Db } from "./fetchMb";
import RelavantWords from "./RelavantWords.vue";

defineProps<{
  mb: Db;
}>();

const prompts = ref("");
</script>

<template>
  <input v-model="prompts" placeholder="输入要查询的字词" />

  <ShowTable v-if="mb.has(prompts)" :mb="mb" :prompts="prompts" />

  <RelavantWords
    v-if="prompts.length"
    :mb="mb"
    :prompts="prompts"
    @new-prompt="(j) => (prompts = j)"
  />

  <template v-if="mb.has(prompts)">
    <h2>汉典</h2>
    <iframe
      :src="`https://www.zdic.net/hans/${encodeURI(prompts)}`"
      frameborder="0"
      width="100%"
      height="400vh"
      seamless
      sandbox=""
    ></iframe>
  </template>
</template>
<style scoped>
input {
  display: block;
  margin: auto;
  padding: 4px 12px;
  text-align: center;
  border-radius: 2em;
  border: 2px solid var(--vp-c-brand-dark);
  transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}
input:focus {
  box-shadow: 0 4px 1px var(--vp-c-brand);
}
</style>
