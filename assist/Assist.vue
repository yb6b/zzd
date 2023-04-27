<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { fetchMb, Db } from "./fetchMb";

const prompts = ref("");
const mb = ref();
const showMore = ref(false);

onMounted(async () => {
  mb.value = await fetchMb();
});

const relavantWords = computed(() => {
  if (!mb.value) return [];
  showMore.value = false;
  const result: string[] = [];
  for (const [k, v] of mb.value as Db) {
    if (k.includes(prompts.value) && k !== prompts.value) {
      result.push(k);
    }
  }
  return result;
});
</script>

<template>
  <input v-model="prompts" placeholder="输入要查询的字词" />
  <template v-if="mb">
    <div v-if="mb.has(prompts)">
      <table>
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
    </div>

    <div v-if="prompts.length && relavantWords.length">
      <h2>{{ relavantWords.length }} 个相关的词条</h2>
      <div class="flex">
        <a
          v-for="i of relavantWords.slice(0, 100)"
          @click="
            () => {
              prompts = i;
            }
          "
          >{{ i }}</a
        >
      </div>
      <button
        v-if="relavantWords.length > 100 && showMore === false"
        @click="
          () => {
            showMore = true;
          }
        "
      >
        显示剩余{{ relavantWords.length - 100 }}个词条…
      </button>
      <div class="flex" v-if="showMore">
        <a
          v-for="i of relavantWords.slice(100)"
          @click="
            () => {
              prompts = i;
            }
          "
          >{{ i }}</a
        >
      </div>
    </div>
  </template>
  <div v-else class="warning custom-block">
    正在加载哲豆音形码表……
  </div>
</template>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-items: left;
}

a {
  display: block;
  padding: 0 8px;
  word-break: keep-all;
}
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
button {
  display: block;
  margin: auto;
  margin-top: 1em;
  background-color: var(--vp-button-brand-bg);
  padding: 2px 16px;
  color: azure;
  opacity: 0.5;
  border-radius: 4px;
}

button:hover {
  opacity: 1;
}
</style>
