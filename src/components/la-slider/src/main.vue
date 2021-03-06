<template>
  <div class="la-slider" :style="{ height: height }">
    <div class="slider-container">
      <slot>
        <!-- SliderItem -->
      </slot>
      <ul v-if="arrow">
        <transition name="fade">
          <li
            v-show="!(!loop && activeIndex === 0)"
            class="la-icon-arrow la-icon-arrow-l"
            :class="{ light: arrowColor === 'light' }"
            @click.stop="throttledArrowClick('left')"
          ></li>
        </transition>
        <transition name="fade">
          <li
            v-show="!(!loop && activeIndex === itemsLen - 1)"
            class="la-icon-arrow la-icon-arrow-r"
            :class="{ light: arrowColor === 'light' }"
            @click.stop="throttledArrowClick('right')"
          ></li>
        </transition>
      </ul>
      <ul v-if="indicator" class="la-indicator">
        <li
          v-for="item in itemsLen"
          :key="item"
          :class="{
            on: activeIndex === item - 1,
            light: indicatorColor === 'light'
          }"
          @click.stop="handleIndicator(item)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import _throttle from "../../../utils/_throttled";

export default {
  name: "LaSlider",

  props: {
    type: {
      // TODO: 切换效果类型
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "100%"
    },
    initIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: false
    },
    arrowColor: {
      type: String,
      default: "deep"
    },
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String,
      default: "deep" // light/deep
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
      default: "right"
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
    };
  },

  computed: {
    countTouchRatio() {
      return this.$el.offsetWidth * this.touchRatio;
    }
  },

  watch: {
    activeIndex(newVal, oldVal) {
      this.$emit("changeIndex", {
        activeIndex: newVal,
        oldIndex: oldVal
      });
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
    this.bindTouchEvent();
    this.$nextTick(() => {
      this.autoPlayItems();
    });
  },

  beforeDestroy() {
    this.pausePlayItems();
  },

  methods: {
    // 更新item状态数据
    initItems() {
      // 缓存子组件
      this.items = this.$children.filter(
        child => child.$options.name === "SliderItem"
      );
      this.itemsLen = this.$children.length;
      // 初始化位置
      this.activeIndex = this.oldIndex = this.initIndex;
      this.handleItemsTransition();
    },
    handleItemsTransition() {
      this.items.forEach((item, index) => {
        item.initItemTranslate(index, this.activeIndex, this.itemsLen);
        item.addIsTransition(index, this.activeIndex, this.oldIndex);
      });
    },

    // 当前index
    countActiveIndex(direct) {
      this.oldIndex = this.activeIndex;
      if (direct === "right") {
        this.activeIndex === this.itemsLen - 1
          ? this.loop
            ? (this.activeIndex = 0)
            : (this.activeIndex = this.itemsLen - 1)
          : this.activeIndex++;
      } else {
        this.activeIndex === 0
          ? this.loop
            ? (this.activeIndex = this.itemsLen - 1)
            : (this.activeIndex = 0)
          : this.activeIndex--;
      }
    },

    // item切换
    moveItemPosition(direct) {
      this.countActiveIndex(direct);
      this.handleItemsTransition();
    },

    // 滑动弹性
    bindTouchEvent() {
      let _this = this;
      this.$el.addEventListener(
        "touchstart",
        function(e) {
          _this.pausePlayItems();
          let event = e || window.event;
          this.startX = event.touches[0].clientX;
        },
        false
      );

      this.$el.addEventListener(
        "touchmove",
        function(e) {
          let event = e || window.event;
          _this.handleEventModifier(event);
          let currentDis = this.moveDis || 0;
          this.moveX = event.touches[0].clientX;
          this.moveDis = this.moveX - this.startX;
          // 单次增量
          let incrementDis = this.moveDis - currentDis;
          _this.items.forEach((item, index) => {
            item.addIsTransition(index, this.activeIndex, this.oldIndex);
            item.touchmoveTranslate(incrementDis);
          });
        },
        false
      );

      this.$el.addEventListener(
        "touchend",
        function(e) {
          let event = e || window.event;
          this.endX = event.changedTouches[0].clientX;
          // methods内调用计算属性值 需指向vm?
          if (this.moveDis < -_this.countTouchRatio) {
            _this.moveItemPosition("right");
          } else if (this.moveDis > _this.countTouchRatio) {
            _this.moveItemPosition("left");
          } else {
            _this.items.forEach((item, index) => {
              item.touchmoveTranslate(this.moveDis * -1);
            });
          }
          this.moveDis = this.startX = this.endX = this.moveX = 0;
          _this.autoPlayItems();
        },
        false
      );
    },

    autoPlayItems() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          if (!this.loop) {
            if (this.activeIndex === 0 && this.direction === "left") {
              return this.handleIndicator(this.itemsLen);
            } else if (
              this.activeIndex === this.itemsLen - 1 &&
              this.direction === "right"
            ) {
              return this.handleIndicator(1);
            }
          }
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
      if (indicatorIndex <= 0 || indicatorIndex > this.itemsLen) return; // 无效数据
      this.pausePlayItems();
      this.oldIndex = this.activeIndex;
      this.activeIndex = indicatorIndex - 1;
      this.handleItemsTransition();
      this.autoPlayItems();
    },

    sliderPrev() {
      this.throttledArrowClick("left");
    },

    sliderNext() {
      this.throttledArrowClick("right");
    },

    handleEventModifier(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>
