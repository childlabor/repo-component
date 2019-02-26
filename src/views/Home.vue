<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome" />
    <div class="btn-group">
      <div class="btn" @click="showToast()">show1</div>
      <div class="btn" @click="showToast2()">show2</div>
      <div class="btn" @click="closeToast()">close!!!</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      i: 0,
      j: 0
    }
  },
  mounted() {
    // this.$toast.warning('警告');
  },
  methods: {
    // leftTime(count) {
    //   setInterval(() => {
    //     count+=1
    //     console.log(count/10);
    //   }, 100);
    // },
    showToast() {
      this.$toast({
        message: '测试数据1',
        type: 'success',
        duration: 2000,
        animate: 1,
        onClose: function() {
          console.log('closed callback', this);
        }
      });
    },
    showToast2() {
      this.$toast({
        message: '测试数据2',
        type: 'success',
        duration: 3000,
        animate: 2,
        onClose: function() {
          console.log('closed callback2');
        }
      });
    },
    closeToast() {
      this.$toast.close();
    }
  }
};
</script>
<style lang="scss" scoped>
  .home {
    .btn-group {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      color: #fff;
      .btn {
        width: 200px;
        height: 80px;
        line-height: 80px;
        border-radius: 15px;
        background: #40cc8d;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>
