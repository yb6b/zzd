<script setup>
import EachKey from "./EachKey.vue";
import { computed, watch, ref } from "vue";
const p = defineProps(["kbdstyle"]);
const kbdStyle = ref("a");
watch(() => {
  if (p.kbdstyle) kbdStyle.value = p.kbdstyle;
});
</script>

<template>
  <div class="kbd">
    <template v-if="kbdStyle === 'a'">
      <div class="row">
        <EachKey :keyname="k" v-for="k of 'qwertyuiop'" />
      </div>
      <div class="row">
        <div style="flex: 0.3"></div>
        <EachKey :keyname="k" v-for="k of 'asdfghjkl'" />
        <div style="flex: 0.7"></div>
      </div>
      <div class="row">
        <div style="flex: 0.8"></div>
        <EachKey :keyname="k" v-for="k of 'zxcvbnm'" />
        <div style="flex: 2.2"></div>
      </div>
    </template>
    <template v-else-if="kbdStyle === 'l'">
      <div class="row">
        <EachKey :keyname="k" v-for="k of 'qwert'" />
        <div style="flex: 0.8"></div>
      </div>
      <div class="row">
        <div style="flex: 0.3"></div>
        <EachKey :keyname="k" v-for="k of 'asdfg'" />
        <div style="flex: 0.5"></div>
      </div>
      <div class="row">
        <div style="flex: 0.8"></div>
        <EachKey :keyname="k" v-for="k of 'zxcvb'" />
      </div>
    </template>
    <template v-else>
      <div class="row">
        <EachKey :keyname="k" v-for="k of 'yuiop'" />
        <div style="flex: 0.8"></div>
      </div>
      <div class="row">
        <div style="flex: 0.3"></div>
        <EachKey :keyname="k" v-for="k of 'hjkl'" />
        <div style="flex: 1.5"></div>
      </div>
      <div class="row">
        <div style="flex: 0.8"></div>
        <EachKey :keyname="k" v-for="k of 'nm'" />
        <div style="flex: 3.2"></div>
      </div>
    </template>
  </div>

  <hr />
  <div class="chs">
    键盘样式：
    <label> <input type="radio" v-model="kbdStyle" value="l" /> 左手</label>
    <label> <input type="radio" v-model="kbdStyle" value="a" /> 完整键盘</label>
    <label> <input type="radio" v-model="kbdStyle" value="r" /> 右手</label>
  </div>
</template>
<style scoped>
.kbd {
  overflow: auto;
  max-width: 90vw;
}
.row {
  display: flex;
}

label {
  margin-right: 0.4em;
}
.chs {
  text-align: right;
  color: gray;
}
</style>
