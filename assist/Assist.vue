<script setup lang="ts">
import { ref } from "vue";
import { fetchMb, Db } from "./fetchMb";

const prompts = ref("");
let mb: Db ;

async function getMb() {
  mb = await fetchMb();
}
getMb();
</script>

<template>
  <input v-model="prompts" placeholder="输入要查询的字词" />
  <ul v-if="mb?.has(prompts)">
    <li v-for="i of mb.get(prompts)" v-text="i"></li>
  </ul>
</template>
<style>
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
