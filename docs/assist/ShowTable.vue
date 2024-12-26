<script setup lang="ts">
import { computed, onMounted } from "vue";
const p = defineProps(["mb", "prompts"]);

interface CodeDatas {
  code: string;
  dupl: string;
  isPer: boolean;
}

const codeDatas = computed(() => {
  const codesrc = p.mb[p.prompts] as string;
  const pattern = /([a-z]+)(\d+)(\*?)/g;
  const r: CodeDatas[] = [];
  while (1) {
    const match = pattern.exec(codesrc);
    if (!match) break;
    r.push({
      code: match[1],
      dupl: match[2],
      isPer: !!match[3],
    });
  }
  return r;
});

const isPerOnly = computed(() => {
  for (const i of codeDatas.value) {
    if (!i.isPer) {
      return false;
    }
  }
  return true;
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
            {{ i.isPer ? "" : "是" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="text-align: center" v-show="isPerOnly">
    该词只在圆满版中，快版不含它。
  </div>
</template>
