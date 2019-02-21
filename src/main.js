import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

// npm包
// import 'mycustomui/lib/styles/index.css';
// import customUI from "mycustomui";
// 本地测试
import './styles/src/index.scss';
import customUI from "./components/index";

Vue.use(customUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
