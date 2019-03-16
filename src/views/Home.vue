<template>
  <div class="home" @click="handleClick">
    <div class="demo"></div>
    <div class="demo2"></div>
    <div class="demo3"></div>

    <img alt="Vue logo" src="../assets/images/logo.png" />
    <div class="slider-box" v-if="true">
      <LaSlider
        ref='abc'
        height="100%"
        :initIndex="initIndex"
        :loop="loop"
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
      initIndex: 4,
      loop: true,
      arrow: true,
      arrowColor: 'light',
      autoplay: true,
      interval: 1000,
      direction: 'left',
      indicator: true,
      indicatorColor: 'light',
      touchRatio: 0.2
    }
  },
  mounted() {
    this.$toast({
      message: '测试数据5',
      type: 'loading',
      duration: 2000,
      animate: 2,
      onClose: function() {
        console.log('closed callback');
      }
    });

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
    .demo {
      position: absolute;
      top: 80px;
      left: 50%;
      margin-left: -150px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      animation: scal 2.4s ease-in-out infinite;
      background: red;
    }
    .demo2 {
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -100px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      animation: scal 2.4s ease-out infinite;
      background: cyan;
    }
    .demo3 {
      position: absolute;
      top: 110px;
      left: 50%;
      margin-left: -75px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      animation: scal 2.4s ease-out infinite;
      background: green;
    }
    
    @keyframes scal {
      0% {
        transform: scale(1);
      }
      20% {
        transform: scale(1.2);
      }
      40% {
        transform: scale(0.9);
      }
      60% {
        transform: scale(1.2);
      }
      80% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes jello {
      11.1% {
        transform: none
      }
      22.2% {
        transform: skewX(-12.5deg) skewY(-12.5deg)
      }
      33.3% {
        transform: skewX(6.25deg) skewY(6.25deg)
      }
      44.4% {
        transform: skewX(-3.125deg) skewY(-3.125deg)
      }
      55.5% {
        transform: skewX(1.5625deg) skewY(1.5625deg)
      }
      66.6% {
        transform: skewX(-.78125deg) skewY(-.78125deg)
      }
      77.7% {
        transform: skewX(.39063deg) skewY(.39063deg)
      }
      88.8% {
        transform: skewX(-.19531deg) skewY(-.19531deg)
      }
      100% {
        transform: none
      }
    }

  }
</style>
