<script setup>
import { inject } from "vue";
import SymbolData from "./ESymbols.json";
const codes = inject("code");
const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const atLeastOne = (n) => (n < 1 ? 1 : n);
</script>

<template>
  <div style="display: flex; justify-content: center">
    <table>
      <tr>
        <th>编码</th>
        <th>符号</th>
        <th>说明</th>
        <th>更深一层</th>
      </tr>
      <template v-for="a of Alphabet">
        <template v-if="SymbolData?.[codes + a]">
          <tr>
            <td :rowspan="atLeastOne(SymbolData[codes + a].words.length)">
              <code>{{ codes + a }}</code>
            </td>
            <td>{{ SymbolData[codes + a].words[0]?.content ?? "" }}</td>
            <td>{{ SymbolData[codes + a].words[0]?.detail ?? "" }}</td>
            <td :rowspan="atLeastOne(SymbolData[codes + a].words.length)">
              <a
                @click="
                  () => {
                    codes = codes + a;
                  }
                "
                >{{ SymbolData[codes + a].title }}</a
              >
            </td>
          </tr>
          <template v-for="b of SymbolData[codes + a].words.slice(1)">
            <tr>
              <td>{{ b.content }}</td>
              <td>{{ b.detail }}</td>
            </tr>
          </template>
        </template>
      </template>
    </table>
  </div>
</template>
