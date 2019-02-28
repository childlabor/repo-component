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
    // this.initItemTranslate();
  },
  computed: {
    parentWidth: function () {
      return this.$parent.$el.offsetWidth;
    }
  },
  methods: {
    initItemIndex(activeIndex, length) {
      let index = this.index;
      if (activeIndex === 0 && index === length - 1) {
        return length; // 初始状态，左侧为空，将右侧最后一个提到左侧第一
      } else if (activeIndex === length - 1 && index === 0) {
        return -1; // 左移至最后一个，将第一个提到右侧最后
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },
    initItemTranslate(activeIndex, length) {
      this.translate = this.initItemIndex(activeIndex, length) * this.parentWidth;
    },
    itemTranslate(activeIndex, length) {
      this.translate = this.initItemIndex(activeIndex, length) * this.parentWidth;
    },
  }
};
</script>
