import HelloWorld from './hello-world/index';
import Toast from './toast/index';
import {LaSlider, SliderItem} from './la-slider/index';



const components = [
  HelloWorld,
  LaSlider,
  SliderItem
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$toast = Toast;
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  HelloWorld,
  Toast,
  LaSlider,
  SliderItem
};

