import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  // {
  //   path: '/audio',
  //   name: 'AudioPage',
  //   component: () => import('@/views/AudioPage.vue')
  // },
  {
    path: "/play",
    name: "PlayPage",
    component: () => import("@/views/PlayPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

export default router;
