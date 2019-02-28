import LaSlider from './src/main';
import SliderItem from './src/item';

LaSlider.install = function(Vue) {
  Vue.component(LaSlider.name, LaSlider);
};

SliderItem.install = function(Vue) {
  Vue.component(SliderItem.name, SliderItem);
};
export {
  LaSlider,
  SliderItem
};