<template>
  <div style="color: red">
    this is content component
    {{ title }}
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'Remote Component in Action..',
    };
  },
};
</script>
