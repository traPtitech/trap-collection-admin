import Top from "./pages/Top.vue";
import NotFound from "./pages/NotFound.vue";

export const routes = [
  { path: "/", component: Top },
  { path: "/:path(.*)", component: NotFound },
];
