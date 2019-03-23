import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/test1",
      name: "test1",
      component: () => import("../views/test1/index.vue")
    },
    {
      path: "/test2",
      name: "test2",
      component: () => import("../views/test2/index.vue")
    }
  ]
});
