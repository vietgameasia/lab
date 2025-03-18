import { createRouter, createWebHistory } from "vue-router"
import EmbedBenchmarkGamesView from "@/views/embed/EmbedBenchmarkGamesView.vue"
import EmbedBenchmarkGamesCompareView from "@/views/embed/EmbedBenchmarkGamesCompareView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/embed/benchmark/:id/games",
      component: EmbedBenchmarkGamesView,
    },
    {
      path: "/embed/benchmark/:id/games/compare",
      component: EmbedBenchmarkGamesCompareView,
    },
  ],
})

export default router
