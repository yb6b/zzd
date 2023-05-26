<script setup lang="ts">
defineProps(["mb", "prompts"]);
</script>
<template>
  <div style="display: flex; justify-content: center">
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
</template>
