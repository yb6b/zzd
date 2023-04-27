<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchMb, Db } from "./fetchMb";

const prompts = ref("");
const mb = ref();

onMounted(async () => {
  mb.value = await fetchMb();
});
</script>

<template>
  <input v-model="prompts" placeholder="输入要查询的字词" />

  <table v-if="mb?.has(prompts)">
    <tr>
      <th>编码</th>
      <th>选重</th>
    </tr>
    <tr v-for="i of mb.get(prompts)">
      <td>
        <code>{{ i.code }}</code>
      </td>
      <td>
        {{ i.duplicated }}
      </td>
    </tr>
  </table>
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
