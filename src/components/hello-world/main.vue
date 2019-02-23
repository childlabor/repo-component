<template>
  <div class="hello">
    <div class="vm">px2vm test</div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
