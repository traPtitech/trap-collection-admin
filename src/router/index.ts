import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { getRequest2Callback } from "@/utils/api.ts"

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
      },
      {
        name: 'AddGame',
        path: 'games/new',
        component: () => import('@/views/pages/AddGame.vue'),
      },
      {
        name: 'Versions',
        path: 'versions',
        component: () => import('@/views/pages/Versions.vue'),
      },
      {
        name: 'AddVersion',
        path: 'versions/new',
        component: () => import('@/views/pages/AddVersion.vue'),
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
