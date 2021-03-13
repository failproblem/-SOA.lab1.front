import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/~s207603/",
      name: "s207603",
      component: () => import("./components/Home")
    },
    {
      path: "/routes",
      name: "routes",
      component: () => import("./components/RoutesList")
    },
    {
      path: "/routes/:id",
      name: "route-details",
      component: () => import("./components/Route")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddRoute")
    },
    {
      path: "/special",
      name: "special",
      component: () => import("./components/Special")
    }
  ]
});
