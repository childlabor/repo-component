import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import _store from "./utils/_store";

// 组件库
import './styles/src/index.scss';
import customUI from "./components/index";

Vue.use(customUI);
Vue.prototype._store = _store;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
