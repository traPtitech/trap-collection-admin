import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/DashBoard.vue'),
      },
      {
        name: 'GameList',
        path: 'gamelist',
        component: () => import('@/views/pages/GameList.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
