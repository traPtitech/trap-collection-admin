import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from '../store'
import { redirect2AuthEndpoint, getRequest2Callback } from "@/utils/api.ts"

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/DashBoard.vue'),
      }
    ]
  },
  {
    path: "/callback",
    component: () => import('@/views/Index.vue'),
    beforeEnter: async (to, _, next) => {
      await getRequest2Callback(to);
      const destination = sessionStorage.getItem("destination")
      if (destination) {
        const url: string = destination
        next(url)
      }
      next()
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach(async (to, _, next) => {
//   // ログイン済みかどうか調べる
//   if (!store.state.me) {
//     await store.dispatch('whoAmI')
//   }

//   // ログインできなかった場合(Sessionがなかった場合)
//   if (!store.state.me) {
//     sessionStorage.setItem(`destination`, to.fullPath)
//     redirect2AuthEndpoint()
//   // ログインできた場合
//   } else {
//     next()
//   }

// })

export default router;
