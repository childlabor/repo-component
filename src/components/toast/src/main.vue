<template>
  <transition :name="animateType[animate - 1]">
    <div
      class="custom-toast"
      :class="{'toast-info': type==='info'}"
      v-show="visible">
      <div class="toast-box">
        <i :class="['toast-icon iconfont', `icon-${type}`]"></i>
        <p
          class="toast-p"
          :class="{'max-font': fontSize==='max'}">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",

  data() {
    return {
      visible: false,
      closed: false,
      message: String,
      fontSize: String,
      type: String,
      timer: null,
      duration: 2500,
      animate: 1,
      animateType: ['fade', 'fadeInDown', 'zoomOut'],
      onClose: null
    }
  },

  mounted() {
    this.startTimer();
  },

  beforeDestroy() {
    this.clearTimer();
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },

  methods: {
    startTimer() {
      // 设为0 不自动关闭
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    close() {
      this.closed = true;
      this.clearTimer();
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  }
};
</script>

