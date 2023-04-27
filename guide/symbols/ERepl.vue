<script setup lang="ts">
import { DataE } from "./SymbolsDataUnderE";
import { ref, computed } from "vue";
const codes = ref("e");

function calcOpacity(keyName: string) {
  if (";,./".includes(keyName)) return 0.7;
  return 1;
}

function getTitle(codes: string) {
  const data = DataE?.[codes];
  if (!data) return "";
  if (data[0].length) return data[0];

  // TODO 尽量不要用自动生成的标题
  let result: string[] = [];
  const childData = data[1];
  for (const i of Object.values(childData)) {
    if (typeof i[0] === "string") {
      result.push(i[0]);
    } else {
      result.push(i[0].words);
    }
  }

  result = [...new Set(result)];
  const rl = result.length;
  if (rl > 4) {
    const base = Math.floor(rl / 3);
    result = result.filter((_, i) => i % base === 1);
  }

  return result.join(" ");
}
</script>

<template>
  <input v-model="codes" placeholder="至少写个e" />
  <h2>
    <code>{{ codes }}</code>
    {{ getTitle(codes) }}
  </h2>
  <p v-html="DataE?.[codes]?.[2]"></p>
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
      <div class="entries" v-if="DataE?.[codes][1]?.[key]">
        <div v-for="e of DataE?.[codes][1]?.[key]" v-text="e"></div>
      </div>
      <template v-if="DataE?.[codes + key]">
        <hr style="margin: 0;">
        <button
          @click="
            () => {
              codes = codes + key;
            }
          "
        >
          {{ getTitle(codes + key) }}
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.entries {
  display: flex;
  flex-wrap: wrap;
}

.entries > div {
  margin-left: 4px;
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
  padding: .2rem 1rem;
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
