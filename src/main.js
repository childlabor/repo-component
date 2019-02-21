import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

// import '../lib/index.css';
// import customUI from "../lib/index.js";
import customUI from "../lib/vcolorpicker.umd";

// import customUI from "./index";

Vue.use(customUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
