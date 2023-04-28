<script setup lang="ts">
import { ref, provide } from "vue";
import FormatTable from "./FormatTable.vue";
import FormatKbd from "./FormatKbd.vue";
import Data from "./ESymbols.json";
const codes = ref("e");
provide("code", codes);
</script>

<template>
  <input v-model="codes" placeholder="至少写个e" />
  <h2>
    <code>{{ codes }}</code>
    {{ Data[codes]?.title }}
  </h2>
  <button :disabled="codes.length < 2"
    @click="
      () => {
        codes = codes.slice(0, -1);
      }
    "
  >
    ⮜ 返回上一级
  </button>
  <div v-html="Data[codes]?.description"></div>
  <template v-if="Data[codes]">
    <FormatKbd v-if="Data[codes].description.includes('键盘')" />
    <FormatTable v-else />
  </template>
</template>

<style scoped>
button {
  color: var(--vp-c-brand);
  display: inline-block;
  padding: 2px 4px;
  font-size: medium;
  margin-bottom: .6rem;
}

button:disabled{
  opacity: .5;
  color: darkolivegreen;
}

input {
  border: #a27800 solid;
  border-radius: 5rem;
  padding: 0.3rem;
  font-family: monospace;
  padding: 0.2rem 1rem;
  display: block;
  margin: auto;
}
</style>
