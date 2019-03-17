<!--
[![NPM](https://nodei.co/npm/mycustomui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mycustomui/) -->
<h1 align="center">mycustomui</h1>
<p align="center">
    <a href="https://www.npmjs.com/package/mycustomui"><img src="https://badgen.net/bundlephobia/minzip/mycustomui?color=cyan" /></a>
    <a href="https://www.npmjs.com/package/mycustomui"><img src="https://badgen.net/npm/dependents/mycustomui" /></a>
    <a href="https://www.npmjs.com/package/mycustomui"><img src="https://badgen.net/npm/v/mycustomui" /></a>
    <a href="https://www.npmjs.com/package/mycustomui"><img src="https://badgen.net/badge/license/MIT/blue" /></a>
</p>
<p align="center">
基于vue的UI组件库，功能持续增加中...
</p>

## TOC
<!-- TOC -->

- [TOC](#toc)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Props](#props)
  - [走马灯：LaSlider](#走马灯laslider)
    - [LaSlider Attr](#laslider-attr)
    - [LaSlider Methods](#laslider-methods)
    - [LaSlider Events](#laslider-events)
  - [轻提示：toast](#轻提示toast)
    - [轻提示：toast Attr](#轻提示toast-attr)
    - [toast Methods](#toast-methods)
- [Demo](#demo)
- [TODO list](#todo-list)

<!-- /TOC -->

## Installation

### NPM
```
$ npm install mycustomui --save

```
### CDN
```
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/mycustomui/lib/styles/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/mycustomui/lib/customui.umd.min.js"></script>
```


## Quick Start
```
import Vue from 'vue';

import 'mycustomui/lib/styles/index.css';
import customUI from "mycustomui";

Vue.use(customUI);
...

// 示例：HelloWorld
<HelloWorld msg="Welcome" />


// 组件：LaSlider/SliderItem 走马灯
<LaSlider :arrow="true" @changeIndex="changeIndex">
  <SliderItem v-for="(item, index) in 5" :key="index">
    <h1>插入内容</h1>
  </SliderItem>
</LaSlider>
...
methods: {
  changeIndex(res) {
    console.log(res);
  }
}

// 方法：toast轻提示
this.$toast.warning('warning');

this.$toast({
  message: 'test',
  type: 'success',
  duration: 2000,
  animate: 1,
  onClose: function() {
    console.log('closed callback');
  }
});

```

## Props

### 走马灯：LaSlider

#### LaSlider Attr
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------:| :------: | :------: | :------: | :------: |
| height | 高度 | String | -- | 100% |
| initIndex | 初始状态激活项的索引，从 0 开始 | Number | -- | 0 |
| loop | 循环切换 | Boolean | true/false | true |
| arrow | 切换箭头的显示 | Boolean | true/false | false |
| arrowColor | 切换箭头的色系 | String | light/deep | deep |
| indicator | 底部指示器 | Boolean | true/false | true |
| indicatorColor | 底部指示器色系 | String | light/deep | deep |
| autoplay | 自动切换 | Boolean | true/false | true |
| interval | 切换间隔 | Number | -- | 3000 |
| direction | 切换方向 | String | left/right | right |
| touchRatio | 触发切换所需拖动比例 | Number | 0~1 | 0.3 |

#### LaSlider Methods
| 方法名 | 说明 | 参数 | 示例 |
| :------:| :------: | :------: | :------: |
| sliderPrev | 	切换至上一项 | -- | this.$refs[name].sliderNext() |
| sliderNext | 	切换至下一项 | -- | -- |
| handleIndicator | 	切换至指定项 | 需要切换的索引，从 1 开始 | -- |

#### LaSlider Events
| 事件名称 | 说明 | 回调参数 |
| :------:| :------: | :------: |
| changeIndex | 切换时触发，返回当前激活项的索引和原激活项的索引 | json |


### 轻提示：toast

#### 轻提示：toast Attr
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------:| :------: | :------: | :------: | :------: |
| type | 提示类型(纯文本多文字提示选info) | String | ['success', 'warning', 'loading', 'info'] | -- |
| duration | 持续时间ms | Number | 0 默认不关闭 | 2500 |
| message | 提示文本 | String | -- | -- |
| fontSize | 文本字体大小 | String | 'max' | -- |
| animate | 显示动效 | Number | [1, 2, 3] | 1 |
| onClose | 回调函数 | Function | -- | -- |

#### toast Methods
| 方法名 | 说明 | 参数 | 示例 |
| :------:| :------: | :------: | :------: |
| close | 主动关闭提示 | -- | this.$toast.close() |


## Demo
<a href="http://132.232.77.14/dist/index.html">
  <img src="./public/demo_link.png" alt="扫码查看在线示例" width="200px" height="200px">
</a>

[扫码查看在线示例](https://github.com/childlabor/customui-demo)

## TODO list
1. 补充组件库
2. 组件按需引入
3. 整理文档及demo
4. 单元测试

