<template>
  <div 
    class="la-slider" 
    :style="{ height: height}">
    <div class="slider-container">
      <slot>
        <!-- SliderItem -->
      </slot>
      <ul v-if="showArrow">
        <li
          class="la-icon-arrow la-icon-arrow-l"
          :class="{light: arrowColor === 'light'}"
          @click.stop="moveItemPosition('left')"
        ></li>
        <li
          class="la-icon-arrow la-icon-arrow-r"
          :class="{light: arrowColor === 'light'}"
          @click.stop="moveItemPosition('right')"></li>
      </ul>
      <ul v-if="showIndicator"
        class="la-indicator">
        <li
          v-for="item in itemsLen"
          :key="item"
          :class="{on: activeIndex === item-1, light: indicatorColor === 'light'}"
          @click.stop="handleIndicator(item)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LaSlider",
  props: {
    type: {  // TODO: 切换效果类型
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '100%'
    },
    arrow: {
      type: Boolean,
      default: false
    },
    arrowColor: {
      type: String,
      default: 'deep' // light/deep
    },
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String,
      default: 'deep' // light/deep
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    direction: {
      type: String,
      default: 'left' // left/right
    },
  },
  data() {
    return {
      items: [],
      itemsLen: Number,
      activeIndex: 0,
      oldIndex: 0,
      timer: null,
      startX: 0,
      moveX: 0,
      endX: 0,
      moveDis: 0,
      endDis: 0
    }
  },
  created() {
  },
  mounted() {
    this.updateItems();
    this.touchEvent();
    this.autoPlayItems();
  },
  computed: {
    showArrow: function() {
      return this.arrow;
    },
    showIndicator: function() {
      return this.indicator;
    }
  },
  methods: {
    // 更新item状态数据
    updateItems() {
      // 缓存子组件
      this.items = this.$children.filter(child => child.$options.name === 'SliderItem');
      this.itemsLen = this.$children.length;
      // 初始化位置
      this.activeIndex = this.oldIndex = this.itemsLen - 1;
      this.items.forEach((item, index) => {
        item.initItemTranslate(index, this.activeIndex, this.itemsLen);
        item.addIsTransition(index, this.activeIndex, this.oldIndex);
      });
    },
    // 当前index
    countActiveIndex(direct) {
      this.oldIndex = this.activeIndex;
      if(direct === 'left') {
        (this.activeIndex === this.itemsLen -1) ? this.activeIndex = 0: this.activeIndex += 1;
      } else {
        (this.activeIndex === 0) ? this.activeIndex = this.itemsLen-1: this.activeIndex -= 1;
      }
    },
    // item切换
    moveItemPosition(direct) {
      // TODO: 防抖
      this.countActiveIndex(direct);
      if(direct === 'left') {
        this.items.forEach((item, index) => {
          item.addIsTransition(index, this.activeIndex, this.oldIndex);
          item.itemTranslate(index, this.activeIndex, this.itemsLen);
        });
      } else {
        this.items.forEach((item, index) => {
          item.addIsTransition(index, this.activeIndex, this.oldIndex);
          item.itemTranslate(index, this.activeIndex, this.itemsLen);
        });
      }
    },
    // 滑动
    touchEvent() {
      let _this = this;
      this.$el.addEventListener('touchstart', function(e) {
        let event = e|| window.event
        this.startX = event.touches[0].clientX
        _this.pausePlayItems();
      }, false);
      this.$el.addEventListener('touchmove', function(e) {
        // TODO:弹性滑动
        let event = e|| window.event;
        this.moveX = event.touches[0].clientX;
        let currentDis = this.moveDis || 0;
        // console.log('currentDis:', currentDis);
        this.moveDis = this.moveX - this.startX;
        // console.log('movedis:', this.moveDis);
        let incrementDis = this.moveDis - currentDis;

        // _this.items.forEach((item, index) => {
        //   item.touchmoveTranslate(incrementDis)
        // });
      }, false);
      this.$el.addEventListener('touchend', function(e) {
        let event = e|| window.event;
        this.endX = event.changedTouches[0].clientX;
        let dis = this.endX - this.startX;
        if(dis < -50) {
          _this.moveItemPosition('left');
        } else if(dis > 50) {
          _this.moveItemPosition('right');
        }
        _this.autoPlayItems();
        // _this.items.forEach((item, index) => {
        //   item.touchmoveTranslate(this.moveDis*-1)
        // });
        // this.moveDis = 0;
      }, false);
    },
    autoPlayItems() {
      if(this.autoplay) {
        this.timer = setInterval(() => {
          this.moveItemPosition(this.direction);
        }, this.interval);
      }
    },
    pausePlayItems() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleIndicator(indicatorIndex) {
      this.pausePlayItems();
      this.oldIndex = this.activeIndex;
      this.activeIndex = indicatorIndex - 1;
      this.items.forEach((item, index) => {
        item.addIsTransition(index, this.activeIndex, this.oldIndex);
        item.itemTranslate(index, this.activeIndex, this.itemsLen);
      });
      this.autoPlayItems();
    }
    // TODO: 事件回调？
  }
};
</script>
