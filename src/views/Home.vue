<template>
  <div class="home" @click="handleClick">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <div class="slider-box">
      <LaSlider
        ref='abc'
        height="100%"
        :initIndex="initIndex"
        :arrow="arrow"
        :arrowColor="arrowColor"
        :autoplay="autoplay"
        :interval="interval"
        :direction="direction"
        :indicator="indicator"
        :indicatorColor="indicatorColor"
        :touchRatio="touchRatio"
        @changeIndex="changeIndex">
        <SliderItem v-for="(item, index) in 5" :key="index">
          <img :src="`https://raw.githubusercontent.com/836939563/printscreen/master/test/test${index +1}.jpg`" alt="">
          <!-- <div style="width: 100%;height: 100%; display: table;text-align: center;">
            <span style=" font-size: 30px;display: table-cell;vertical-align: middle;">
              {{index}}
            </span>
          </div> -->
        </SliderItem>
      </LaSlider>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      initIndex: 3,
      arrow: true,
      arrowColor: 'light',
      autoplay: false,
      interval: 3000,
      direction: 'left',
      indicator: true,
      indicatorColor: 'light',
      touchRatio: 0.2
    }
  },
  mounted() {
    // this.$toast.warning('警告');
    
  },
  methods: {
    handleClick() {
      // this.$refs.abc.sliderNext();
      this.$refs.abc.handleIndicator(5)
    },
    changeIndex(res) {
      // console.log(res);
      
    }
  }
};
</script>
<style lang="scss" scoped>
  .home {
    .slider-box {
      box-sizing: border-box;
      width: 100%;
      height: 60vw;
    }
  }
</style>
