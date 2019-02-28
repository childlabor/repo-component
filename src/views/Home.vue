<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <div class="slider-box">
      <LaSlider height="100%" :arrow="true">
        <SliderItem v-for="(item, index) in items" :key="index" :index="index">
          <!-- <img :src="item.src" alt=""> -->
          <!-- <img :src="`${publicPath}test1.png`"> -->
          <h1>{{index}}</h1>
        </SliderItem>
        <!-- <SliderItem>
          <img src="../assets/images/test2.jpg" alt="">
        </SliderItem>
        <SliderItem>
          <img src="../assets/images/test3.jpg" alt="">
        </SliderItem> -->
      </LaSlider>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      items: [
        {src: '/public/images/test1.jpg'},
        {src: '/public/assets/images/test2.jpg'},
        {src: '/public/assets/images/test3.jpg'}
      ]
    }
  },
  mounted() {
    // this.$toast.warning('警告');
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>
  .home {
    .slider-box {
      box-sizing: border-box;
      width: 100%;
      height: 61.8vw;
      border: 1px solid cyan;
    }
  }
</style>
