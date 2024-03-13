<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { Ref } from "vue";
import FormatTable from "./FormatTable.vue";
import FormatKbd from "./FormatKbd.vue";
import Data from "./ESymbols.json";
import { useUrlSearchParams ,useTitle} from "@vueuse/core";

const title = useTitle(undefined,{titleTemplate: '%s | e 键下的符号 | 哲豆音形'})

const urlParams = useUrlSearchParams()
const codes = ref(urlParams.q as string || 'e');

watch(codes, (newCodes) => {
  urlParams.q = newCodes
  title.value = newCodes
})

provide("code", codes);
const kbdStyle: Ref<"a" | "l" | "r"> = ref("a");
</script>

<template>
  <input v-model="codes" placeholder="至少写个e" />
  <h2>
    <code>{{ codes }}</code>
    {{ Data[codes]?.title }}
  </h2>
  <button :disabled="codes.length < 2" @click="() => {
    codes = codes.slice(0, -1);
  }
    ">
    ⬅ 返回上一级
  </button>
  <div v-html="Data[codes]?.description"></div>
  <template v-if="Data[codes]">
    <FormatKbd v-if="Data[codes].description.includes('键盘')"
      :kbdstyle="Data[codes].description.includes('左手键盘') ? 'l' : kbdStyle" />
    <FormatTable v-else />
  </template>
</template>

<style scoped>
button {
  color: var(--vp-c-brand);
  display: inline-block;
  padding: 2px 4px;
  font-size: medium;
  margin-bottom: 0.6rem;
  transition: 0.5s;
}

button:disabled {
  opacity: 0.4;
  color: gray;
}

button:hover {
  text-shadow: 0 0 5px var(--vp-c-brand);
  color: var(--vp-c-brand-darker);
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
