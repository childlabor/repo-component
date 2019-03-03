<template>
  <div
    class="slider-item"
    :class="{'is-transition': isTransition }"
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

  data() {
    return {
      translate: 0,
      scale: 1,
      isTransition: false // 是否有transition动效
    }
  },

  computed: {
    parentWidth: function () {
      return this.$parent.$el.offsetWidth;
    }
  },

  methods: {
    // 循环index重新排序
    initItemIndex(index, activeIndex, length) {
      // index：目标项 activeIndex: 活跃项
      if(activeIndex === index) {
        return 0
      } else if(activeIndex === 0 && index === length - 1 && this.$parent.loop) {
        return -1
      } else if(activeIndex === length - 1 && index === 0 && this.$parent.loop) {
        return 1
      }
      return index - activeIndex;
    },

    initItemTranslate(index, activeIndex, length) {
      this.translate = this.initItemIndex(index, activeIndex, length) * this.parentWidth;
    },

    itemTranslate(index, activeIndex, length) {
      this.translate = this.initItemIndex(index, activeIndex, length) * this.parentWidth;
    },

    addIsTransition(index, activeIndex, oldIndex) {
      let area = activeIndex - oldIndex;
      let max = this.$parent.itemsLen - 1;
      if( area > 1 && area !== max ) {
        this.isTransition = (index >= oldIndex && index <= activeIndex);
      } else if(area < 1 && area !== -max) {
        this.isTransition = (index <= oldIndex && index >= activeIndex);
      } else { // 相邻
        if(this.$parent.loop) {
          this.isTransition = (index === activeIndex || index === oldIndex);
        } else {
          this.isTransition = true;
        }
      }
    },

    touchmoveTranslate(val) {
      this.translate += val;
    }
  }
};
</script>
