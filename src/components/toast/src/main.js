/*
* 方法
*
* // 手动关闭
* this.$toast.close();
*
* // 简写
* this.$toast.loading(string);
*
* // 常规
* this.$toast({
*    type: String,
*    message: String,
*    duration: 2500,
*    animate: Number, // [1, 2, 3]
*    onClose: function() {}
* });
*
* 参数
* type: ['success', 'warning', 'loading']
* duration: 持续时间ms（default 2500, 0 默认不关闭）
* message: 文本文字
* animate: 显示动效 [1, 2, 3]
* onClose: 回调
*
*/

import Vue from 'vue';
import Main from './main.vue';

// 使用基础 Vue 构造器，创建一个“子类”
let ToastConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
let instanceOnClose = null; // 回調

const Toast = function(options) {
  // 唯一性
  if(instances.length !== 0) {
    instance.vm.$destroy();
    document.body.removeChild(instance.vm.$el);
  }

  // 回调与close转换 避免重复触发
  instanceOnClose = options.onClose;
  options.onClose = function() {
    Toast.close()
  }

  // 创建实例
  instance = new ToastConstructor({
    data: options
  });

  // 挂载到元素
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  instances.push(instance)
  return instance.vm;
};

// 简略模式 只接受message参数
['success', 'warning', 'loading', 'info'].forEach(type => {
  Toast[type] = options => {
    if(typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Toast(options);
  };
});

Toast.close = function() {
  if(instances.length !== 0) {
    if(instanceOnClose) {
      instanceOnClose();
    }
    instance.vm.$destroy();
    document.body.removeChild(instance.vm.$el);
    // reset
    instances.length = 0;
  }
};

export default Toast;
