import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

// 组件库
import './styles/src/index.scss';
import customUI from "./components/index";
// npm包
// import 'mycustomui/lib/styles/index.css';
// import customUI from "mycustomui";


Vue.use(customUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
