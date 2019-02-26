<template>
  <transition :name="animateType[animate - 1]" @after-leave="handleAfterLeave">
    <div class="custom-toast" v-show="visible">
      <div class="toast-box">
        <i :class="['toast-icon', `icon-${type}`]"></i>
        <p class="toast-p">{{ message }}</p>
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
      message: '',
      type: 'info',
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
    close() {
      this.closed = true;
      clearTimeout(this.timer);
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    handleAfterLeave() {
      // console.log('leave');
      this.$destroy(true);
      // this.$el.parentNode.removeChild(this.$el);
    }
  }

};
</script>

