/*
* 引用
* import Toast from 'vue-toast.js';
* import 'vue-toast.css';
* Vue.use(Toast);
*
* 方法
* this.$toast.close();
*
* this.$toast(); // 简写 默认成功
*
* this.$toast({ // 常规
*    type: 'warn',
*    msg: '警告',
*    duration: 2500,
*    onCallback: foo
* });
*
* 参数
* type: warning/success/loading
* duration: 持续时间（default 2500）
* msg: 文本文字
* onCallback: 回调
*
* 注意
* type 为loading时 duration===0则不会自动关闭 需手动调用this.$toast.close();
*/

import Vue from 'vue';
import Main from './main.vue';

// 使用基础 Vue 构造器，创建一个“子类”
let ToastConstructor = Vue.extend(Main);
let instance = null;
let instances = [];
// let instanceOnClose = null; // 回调

const Toast = function(options) {
  // 唯一
  if(instances.length !== 0) {
    document.body.removeChild(instance.vm.$el);
  }

  // 回调与close转换 避免重复触发
  let instanceOnClose = options.onClose;
  options.onClose = function() {
    Toast.close(instanceOnClose)
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
['success', 'warning', 'inloading'].forEach(type => {
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

Toast.close = function(instanceOnClose) {
  console.log(instanceOnClose);
  
  if(instances.length !== 0) {
    if(instanceOnClose) {
      console.log('INS-CB');
      instanceOnClose();
    }
    document.body.removeChild(instance.vm.$el);
    // reset
    instances.length = 0;
    // instanceOnClose = null;
  }
};

export default Toast;





















// var Toast = {};
// Toast.install = function (Vue, globalOptions) {
//   let toastTpl = ''; // 模板
//   let tpl = ''; // 实例

//   // 默认参数
//   let opt = {
//     msg: '提交成功',
//     type: 'success'
//   }

//   // 全局配置参数
//   for(let key in globalOptions){
//     opt[key] = globalOptions[key];
//   }

//   Vue.prototype.$toast = (options) => {
//     // 单独配置参数
//     for(let key in options){
//       opt[key] = options[key];
//     }

//     // 如果toast还在，则不再执行
//     if(document.getElementsByClassName('vue-toast').length){
//       return;
//     }

//     // 1、创建构造器，定义好提示信息的模板
//     if( typeof options === 'string') { // 最简模式
//       toastTpl = Vue.extend({
//         template: `<div class="vue-toast"><div class="toast-box-simple">${ options }</div></div>`
//       });
//     } else { // 对象模式
//       toastTpl = Vue.extend({
//         template:
//         `
//           <div class="vue-toast">
//             <div class="toast-box animated">
//               <i class="toast-icon icon-${opt.type}"></i
//               ><p class="toast-p">${ opt.msg }</p>
//             </div>
//           </div>
//         `
//       });
//     }

//     // 2、创建实例，挂载到文档以后的地方
//     tpl = new toastTpl().$mount().$el;

//     // 3、把创建的实例添加到body中
//     document.body.appendChild(tpl);

//     // 4、延迟*秒后移除该提示
//     if( typeof options === 'string') {
//       console.log('sim model');
//       setTimeout(() => {
//         document.body.removeChild(tpl);
//       }, 1500)
//     } else if(opt.type !== 'loading' || (opt.type === 'loading' && opt.duration !== undefined)) {
//       console.log('hard model');
//       setTimeout(() => {
//         document.querySelector(".toast-box").classList.add("zoomOut");
//         setTimeout(() => {
//           document.body.removeChild(tpl);
//         }, 1000);
//         if( typeof opt.onCallback === 'function') {
//           opt.onCallback();
//         }
//       }, opt.duration || 2500)
//     }

//   }

//   Vue.prototype.$toast.close = () => {
//     document.body.removeChild(tpl);
//   }
// }

// module.exports = Toast;
