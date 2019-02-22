<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1>{{h1}}</h1>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      h1: `自定义env: ${process.env.VUE_APP_TEST}`,
    }
  },
  created() {
    console.log('特殊变量：', process.env.BASE_URL + process.env.NODE_ENV);
  }
};
</script>
