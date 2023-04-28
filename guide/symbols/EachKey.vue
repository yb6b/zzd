<script setup>
import SymbolData from "./ESymbols.json";
import { inject } from "vue";
defineProps(["keyname"]);
const codes = inject("code");
</script>

<template>
  <div class="key">
    <div class="keyname">{{ keyname }}</div>
    <div class="content" v-if="SymbolData?.[codes + keyname]">
      <div class="xcontent" v-for="s of SymbolData[codes + keyname]?.words" :title="s.detail">
        {{ s.content }}
      </div>
    </div>
    <div @click="() => {
        codes = codes + keyname
    }">
      <a> {{ SymbolData[codes + keyname]?.title }}</a>
    </div>
  </div>
</template>

<style >
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.xcontent {
  margin: 0 4px;
}
.key {
  font-size: small;
  flex: 1;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 6px;
  margin: 6px 3px;
  box-shadow: 0 2px 6px #18181853;
  padding: 6px 5px;
  width: 4rem;
  min-width: 3.5rem;
}
.keyname {
  user-select: none;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  opacity: 0.5;
  padding: 2px 8px;
}
</style>
