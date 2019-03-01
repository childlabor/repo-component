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
  props: {
    index: {
      type: Number
    }
  },
  data() {
    return {
      translate: 0,
      scale: 1,
      isTransition: false
    }
  },
  created() {
  },
  mounted() {

  },
  computed: {
    parentWidth: function () {
      return this.$parent.$el.offsetWidth;
    }
  },
  methods: {
    // 循环index重新排序
    initItemIndex(index, activeIndex, length) {
      if(activeIndex === index) {
        return 0
      } else if(activeIndex === 0 && index === length - 1) {
        return -1
      } else if(activeIndex === length - 1 && index === 0) {
        return 1
      }
      return index- activeIndex;
    },
    initItemTranslate(index, activeIndex, length) {
      this.translate = this.initItemIndex(index, activeIndex, length) * this.parentWidth;
    },
    itemTranslate(index, activeIndex, length) {
      this.translate = this.initItemIndex(index, activeIndex, length) * this.parentWidth;
    },
    // 有动效的（用户可见）index添加class
    addIsTransition(index, activeIndex, oldIndex) {
      let area = activeIndex - oldIndex;
      let max = this.$parent.itemsLen - 1;

      if( area > 1 && area !== max ) {
        this.isTransition = (index >= oldIndex && index <= activeIndex);
      } else if(area < 1 && area !== -max) {
        this.isTransition = (index <= oldIndex && index >= activeIndex);
      } else {
        this.isTransition = (index === activeIndex || index === oldIndex);
      }
    },
    touchmoveTranslate(val) {
      this.translate += val;
    }
  }
};
</script>
