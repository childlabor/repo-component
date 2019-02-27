# mycustomui
[![NPM](https://nodei.co/npm/mycustomui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mycustomui/)

基于vue组件库，陆续增加中...

## Installation
```
$ npm install mycustomui --save
```

## Quick Start
```
import Vue from 'vue';

import 'mycustomui/lib/styles/index.css';
import customUI from "mycustomui";

Vue.use(customUI);
...

// HelloWorld
<div>
  <HelloWorld msg="Welcome" />
</div>

/*
* 方法：toast轻提示
*
* 参数
* type: ['success', 'warning', 'loading']
* duration: 持续时间ms（default 2500, 0 默认不关闭）
* message: 文本文字
* animate: 显示动效 [1, 2, 3]
* onClose: 回调
*
*/

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


## TODO list
1. 补充组件库
2. 组件按需引入
3. 整理文档


