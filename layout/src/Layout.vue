<template>
  <div class="layout-app bg-slate-400">
    <Layout>
      <div class="app-label"># Hosting App [HOST]</div>
      <img src="./logo.png" width="30" />
      <h1>Layout App 1</h1>
      <div class="remote-component">
        <!-- remote-component REMOTE -->
        <div class="text-blue-500 font-900">#remote-component [REMOTE]</div>
        <content-element> this is slots </content-element>
        <button-element />
        <el-button type="primary">Button</el-button>
      </div>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "../../core/packages/views/layout/index.vue";
</script>

<style lang="scss" scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
.remote-component {
  border: 1px solid blue;
  padding: 10px;
}
.layout-app {
  .app-label {
    padding: 5px 2px;
    font-style: italic;
    font-size: 20px;
    color: gray;
  }
}
</style>
