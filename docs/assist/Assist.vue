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
  let result: string[][] = [];
  for (const [words, v] of mb.value as Db) {
    const index = words.indexOf(prompts.value);
    if (index !== -1 && words !== prompts.value) {
      if (!result[index]?.push(words)) {
        result[index] = [words];
      }
    }
  }
  result = result.filter(Boolean).map((v) => {
    return v.sort((a, b) => {
      let t = a.length - b.length;
      if (t) return t;
      return a.localeCompare(b);
    });
  });
  return result;
});

const relavantWordsLength = computed(() =>
  relavantWords.value.reduce((p, c) => p + c.length, 0)
);

const limitArray = (src: string[][]) => {
  const result: string[][] = [];
  let counts = 80;
  for (const i of src) {
    if (i.length > counts) {
      result.push(i.slice(0, counts));
      break;
    }
    result.push(i);
    counts -= i.length;
  }

  return result;
};
</script>

<template>
  <template v-if="mb">
    <input v-model="prompts" placeholder="输入要查询的字词" />
    <div v-if="mb.has(prompts)" style="display: flex; justify-content: center">
      <table style="">
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

    <div v-if="prompts.length && relavantWordsLength">
      <h2>{{ relavantWordsLength }} 个相关的词条</h2>
      <template v-if="relavantWordsLength > 100 && !showMore">
        <div class="flex" v-for="i of limitArray(relavantWords)">
          <a
            v-for="j of i"
            @click="
              () => {
                prompts = j;
              }
            "
            >{{ j }}</a
          >
        </div>

        <button
          @click="
            () => {
              showMore = true;
            }
          "
        >
          显示剩余
          {{ relavantWordsLength - 80 }}
          个词条…
        </button>
      </template>
      <template v-else>
        <div class="flex" v-for="i of relavantWords">
          <a
            v-for="j of i"
            @click="
              () => {
                prompts = j;
              }
            "
            >{{ j }}</a
          >
        </div>
      </template>
    </div>
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
  <div v-else class="warning custom-block">正在加载哲豆音形码表……</div>
</template>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-items: left;
  margin-bottom: 1rem;
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
