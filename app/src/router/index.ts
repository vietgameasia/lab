import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import BenchmarkView from "@/views/BenchmarkView.vue"
import EmbedBenchmarkGamesView from "@/views/embed/EmbedBenchmarkGamesView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/benchmark/:id",
      component: BenchmarkView,
    },
    {
      path: "/embed/benchmark/:id/games",
      component: EmbedBenchmarkGamesView,
    },
  ],
})

export default router
