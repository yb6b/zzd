<script setup>
import EachKey from "./EachKey.vue";
</script>

<template>
  <div class="kbd">
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
  </div>
</template>
<style>
.kbd {
  overflow: auto;
  max-width: 90vw;
}
.row {
  display: flex;
}
</style>
