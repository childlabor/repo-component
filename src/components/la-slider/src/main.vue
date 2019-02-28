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
      itemsLen: Number
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
    },
    moveItemPosition(direct) {
      if(direct === 'left') {
        this.items.forEach((item, index) => {
          item.itemTranslateL();
        });
      } else {
        this.items.forEach((item, index) => {
          item.itemTranslateR();
        });
      }
    }
  }
};
</script>
