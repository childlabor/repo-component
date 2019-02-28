<template>
  <div 
    class="slider-item"
    :style="{
      transform: `translateX(${ translate }px) scale(${ scale })`
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SliderItem",
  props: {
    index: {
      type: Number
    }
  },
  data() {
    return {
      translate: 0,
      scale: 1
    }
  },
  created() {

  },
  mounted() {
    this.initItemTranslate();
  },
  computed: {
    parentWidth: function () {
      return this.$parent.$el.offsetWidth;
    }
  },
  methods: {
    initItemTranslate() {
      this.translate = this.index*this.parentWidth;
    },
    itemTranslateL() {
      this.translate = this.translate - this.parentWidth
    },
    itemTranslateR() {
      this.translate = this.translate + this.parentWidth
    }
  }
};
</script>
