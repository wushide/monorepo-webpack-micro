<template>
  <el-config-provider size="large" :z-index="1">
    <div>
      <h3>Main App</h3>
      <Content> </Content>
      <Button />
    </div>
  </el-config-provider>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import { ElConfigProvider } from "element-plus";
// import Content from "./components/Content";
// import Button from "./components/Button";
export default {
  components: {
    ElConfigProvider,
    Content: defineAsyncComponent(() => import("./components/Content")),
    Button: defineAsyncComponent(() => import("./components/Button")),
  },
  // components: {
  //   Content,
  //   Button,
  // },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
