<script setup>
import { withBase } from "vitepress";
const p = defineProps({ data: Object, prefix: String });

const keys = "qwertyuiopasdfghjkl;zxcvbnm,./";

function fixHref(end, key) {
  if (end) return `#${end}`;
  else return `#${p.prefix}${key}`;
}

function calcOpacity(key) {
  if (";,./".includes(key)) return 0.7;
 // if (p?.data?.[key]) return;
  return 1;
}
</script>

<template>
  <div class="symbol-kbd">
    <div v-for="key of keys" :style="{ opacity: calcOpacity(key) }">
      <div class="symbol-keyname" v-text="key"></div>
      <div v-text="p?.data?.[key]?.[0]"></div>
      <template v-if="p?.data?.[key]?.[1]">
        <div v-for="link of p?.data?.[key]?.[1]">
          <a :href="fixHref(link?.[1], key)" target="_self">
            {{ link?.[0] }}
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.symbol-kbd {
  text-align: center;
  font-size: smaller;
  min-width: 26rem;
  width: fit-content;
  max-width: 90vw;
  background-color: rgba(90, 90, 90, 0.32);
  padding: 0.4rem 0.3rem;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
}
.symbol-kbd > div {
  border-radius: 2px;
  background-color: white;
  word-break: break-all;
  min-width: 2rem;
}
.symbol-keyname {
  user-select: none;
  color: #a27800;
  text-transform: uppercase;
  font-family: monospace, system-ui;
}
</style>
