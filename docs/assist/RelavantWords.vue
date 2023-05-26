<script setup lang="ts">
import { computed, ref } from "vue";
let p = defineProps(["mb", "prompts"]);
defineEmits(["newPrompt"]);

const showMore = ref(false);
const relavantWords = computed(() => {
  if (!p.mb) return [];
  showMore.value = false;
  let result: string[][] = [];
  for (const [words, v] of p.mb) {
    const index = words.indexOf(p.prompts);
    if (index !== -1 && words !== p.prompts) {
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
  <template v-if="relavantWordsLength">
    <h2>{{ relavantWordsLength }} 个相关的词条</h2>
    <template v-if="relavantWordsLength > 100 && !showMore">
      <div class="flex" v-for="i of limitArray(relavantWords)">
        <a
          v-for="j of i"
          @click="
            () => {
              $emit('newPrompt', j);
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
              $emit('newPrompt', j);
            }
          "
          >{{ j }}</a
        >
      </div>
    </template>
  </template>
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
