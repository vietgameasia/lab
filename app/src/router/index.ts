import { createRouter, createWebHistory } from "vue-router"
import EmbedBenchmarkGamesView from "@/views/embed/EmbedBenchmarkGamesView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/embed/benchmark/:id/games",
      component: EmbedBenchmarkGamesView,
    },
  ],
})

export default router
