<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { CodeInfo } from '../assist/fetchMb'
const p = defineProps(["mb", "prompts"]);



const codeDatas = computed(() => p.mb.get(p.prompts) as CodeInfo[]);

const isPerOnly = computed(() => {
  const arr: CodeInfo[] = p.mb.get(p.prompts)
  if (arr.every((v) => !v.isMofast)) {
    return true;
  }
  return false;
});
</script>
<template>
  <div style="display: flex; justify-content: center">
    <table style="">
      <thead>
        <tr>
          <th>编码</th>
          <th>选重</th>
          <th>快版</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i of codeDatas">
          <td>
            <code>{{ i.code }}</code>
          </td>
          <td>
            {{ i.dupl }}
          </td>
          <td>
            {{ i.isMofast ? "" : "是" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="text-align: center" v-show="isPerOnly">
    该词只在圆满版中，快版不含它。
  </div>
</template>
