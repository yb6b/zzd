<script setup lang="ts">
import { ref, computed } from "vue";
import rawData from "./SymbolsData.txt?raw";
import { parseRawTsv } from "./preprocessData";
const Data = parseRawTsv(rawData);
const codes = ref("e");

function calcOpacity(keyName: string) {
  if (";,./".includes(keyName)) return 0.7;
  return 1;
}
</script>

<template>
  <input v-model="codes" placeholder="至少写个e" />
  <h2>
    <code>{{ codes }}</code>
    {{ Data.get(codes)?.title }}
  </h2>
  <p v-html="Data.get(codes)?.description"></p>
  <button
    v-if="codes.length > 1"
    @click="
      () => {
        codes = codes.slice(0, -1);
      }
    "
  >
    返回上一级
  </button>
  <div class="symbol-kbd">
    <div
      v-for="key of 'qwertyuiopasdfghjkl;zxcvbnm,./'"
      :style="{ opacity: calcOpacity(key) }"
    >
      <div class="symbol-keyname" v-text="key"></div>
      <div class="entries" v-if="Data.has(codes + key)">
        <span v-for="e of Data.get(codes + key)?.words"
          >{{ e.content
          }}<sup v-if="e.detail" class="info">{{ e.detail }}</sup></span
        >
      </div>
      <template
        v-if="Data.has(codes + key) && !Data.get(codes + key)?.isLongest"
      >
        <hr style="margin: 0" />
        <button
          @click="
            () => {
              codes = codes + key;
            }
          "
        >
          {{ Data.get(codes + key)?.title }}
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.info {
  color: gray;
  background-color: bisque;
  margin: 2px 4px;
  word-break: keep-all;
  padding: 1px 4px;
}
.entries {
  display: flex;
  flex-wrap: wrap;
}

.entries > div {
  margin-left: 4px;
  font-size: xx-small;
}

button {
  color: var(--vp-c-brand);
  /* background-color: #e9e8df88; */
  display: inline-block;
  padding: 2px 4px;
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
