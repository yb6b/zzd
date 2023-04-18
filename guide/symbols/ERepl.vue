<script setup>
import { DataE } from "./SymbolsDataUnderE";
import { ref } from "vue";
const codes = ref("e");

function calcOpacity(key) {
  if (";,./".includes(key)) return 0.7;
  return 1;
}
</script>

<template>
    <input v-model="codes" placeholder="what???" />
    <h2>
        <code>{{ codes }}</code>
        {{ DataE?.[codes][0] }}
    </h2>
  <div class="symbol-kbd">
    <div
      v-for="key of 'qwertyuiopasdfghjkl;zxcvbnm,./'"
      :style="{ opacity: calcOpacity(key) }"
    >
      <div class="symbol-keyname" v-text="key"></div>
      <div v-text="DataE?.[codes][1]?.[key]?.join(' ')"></div>
      <template v-if="DataE?.[codes + key]">
        <a :href="'#'+codes+key" target="_self">
          {{ DataE[codes+key][0] }}
        </a>
      </template>
    </div>
  </div>
</template>

<style>
input{
    border: #a27800 solid;
    border-radius: .5rem;
    padding: .3rem;
    font-family: monospace;
}
.symbol-kbd {
  text-align: center;
  font-size: smaller;
  min-width: 26rem;
  overflow-x: auto;
  background-color: darkgray;
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
