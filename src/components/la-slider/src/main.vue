<template>
  <div class="la-slider" :style="{ height: height}">
    <div class="slider-container">
      <slot>
        <!-- item -->
      </slot>
      <ul v-if="showArrow">
        <li class="la-icon-arrow la-icon-arrow-l" @click="moveItemPosition('left')"></li>
        <li class="la-icon-arrow la-icon-arrow-r" @click="moveItemPosition('right')"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LaSlider",
  props: {
    height: {
      type: String,
      default: '100%'
    },
    arrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      items: [],
      itemsLen: Number,
      activeIndex: 0
    }
  },
  created() {
  },
  mounted() {
    this.updateItems();
  },
  computed: {
    showArrow: function() {
      return this.arrow;
    }
  },
  methods: {
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'SliderItem');
      this.itemsLen = this.$children.length;
      this.activeIndex = this.itemsLen - 1;
      this.items.forEach((item, index) => {
        item.initItemTranslate(this.activeIndex, this.itemsLen)
      });
      console.log(this.activeIndex);
      
    },
    // 计算active的item的index
    countActiveIndex(direct) {
      if(direct === 'left') {
        (this.activeIndex === this.itemsLen -1) ? this.activeIndex = 0: this.activeIndex += 1;
      } else {
        (this.activeIndex === 0) ? this.activeIndex = this.itemsLen-1: this.activeIndex -= 1;
      }
      console.log('active', this.activeIndex);
    },
    moveItemPosition(direct) {
      this.countActiveIndex(direct);
      if(direct === 'left') {
        this.items.forEach((item, index) => {
          // item.itemTranslate(direct);
          item.itemTranslate(this.activeIndex, this.itemsLen)
        });
      } else {
        this.items.forEach((item, index) => {
          // item.itemTranslate(direct);
          item.itemTranslate(this.activeIndex, this.itemsLen)
        });
      }
      
      
    }
  }
};
</script>
