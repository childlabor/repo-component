<template>
  <div
    class="la-slider"
    :style="{ height: height }">
    <div class="slider-container">
      <slot>
        <!-- SliderItem -->
      </slot>
      <ul v-if="arrow">
        <li
          class="la-icon-arrow la-icon-arrow-l"
          :class="{ light: arrowColor === 'light' }"
          @click.stop="throttledArrowClick('left')"
        ></li>
        <li
          class="la-icon-arrow la-icon-arrow-r"
          :class="{ light: arrowColor === 'light' }"
          @click.stop="throttledArrowClick('right')"></li>
      </ul>
      <ul v-if="indicator"
        class="la-indicator">
        <li
          v-for="item in itemsLen"
          :key="item"
          :class="{
            on: activeIndex === item-1,
            light: indicatorColor === 'light'
          }"
          @click.stop="handleIndicator(item)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import _throttle from '../../../utils/_throttled'

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
    initIndex: {
      type: Number,
      default: 0
    },
    arrow: {
      type: Boolean,
      default: false
    },
    arrowColor: {
      type: String,
      default: 'deep'
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
      default: 'left'
    },
    touchRatio: {
      type: Number,
      default: 0.3
    }
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
      moveDis: 0
    }
  },
  created() {
    // ?箭头点击事件，方法写在methods内无法执行
    this.throttledArrowClick = _throttle(direct => {
      this.moveItemPosition(direct);
    }, 500);
  },
  mounted() {
    this.initItems();
    this.touchEvent();
    this.autoPlayItems();
  },
  watch: {
    activeIndex(newVal, oldVal) {
      this.$emit(
        'changeIndex',
        {
          activeIndex: newVal,
          oldIndex: oldVal
        })
    }
  },
  computed: {
    countTouchRatio() {
      return this.$el.offsetWidth * this.touchRatio;
    }
  },
  methods: {
    // 更新item状态数据
    initItems() {
      // 缓存子组件
      this.items = this.$children.filter(child => child.$options.name === 'SliderItem');
      this.itemsLen = this.$children.length;
      // 初始化位置
      this.activeIndex = this.oldIndex = this.initIndex;
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

    // 滑动弹性
    touchEvent() {
      let _this = this;
      this.$el.addEventListener('touchstart', function(e) {
        let event = e|| window.event
        this.startX = event.touches[0].clientX
        _this.pausePlayItems();
      }, false);

      this.$el.addEventListener('touchmove', function(e) {
        let event = e|| window.event;
        let currentDis = this.moveDis || 0;
        this.moveX = event.touches[0].clientX;
        this.moveDis = this.moveX - this.startX;
        // 单次增量
        let incrementDis = this.moveDis - currentDis;
        _this.items.forEach((item, index) => {
          item.addIsTransition(index, this.activeIndex, this.oldIndex);
          item.touchmoveTranslate(incrementDis)
        });
      }, false);

      this.$el.addEventListener('touchend', function(e) {
        let event = e|| window.event;
        this.endX = event.changedTouches[0].clientX;
        // methods内调用计算属性值 需指向vm?
        if(this.moveDis < -_this.countTouchRatio) {
          _this.moveItemPosition('left');
        } else if(this.moveDis > _this.countTouchRatio) {
          _this.moveItemPosition('right');
        } else {
          _this.items.forEach((item, index) => {
            item.touchmoveTranslate(this.moveDis * -1)
          });
        }
        this.moveDis = this.startX = this.endX = this.moveX = 0;
        _this.autoPlayItems();
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
      if(indicatorIndex <= 0 || indicatorIndex > this.itemsLen) return;
      this.pausePlayItems();
      this.oldIndex = this.activeIndex;
      this.activeIndex = indicatorIndex - 1;
      this.items.forEach((item, index) => {
        item.addIsTransition(index, this.activeIndex, this.oldIndex);
        item.itemTranslate(index, this.activeIndex, this.itemsLen);
      });
      this.autoPlayItems();
    },

    sliderPrev() {
      this.throttledArrowClick('left');
    },

    sliderNext() {
      this.throttledArrowClick('right');
    }
  }
};
</script>
