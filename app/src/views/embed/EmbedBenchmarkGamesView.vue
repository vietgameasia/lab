<script setup lang="ts">
import { pb } from "@/utils/client"
import { useRoute } from "vue-router"
import { useAsyncState } from "@vueuse/core"
import {
  Collections,
  type BenchmarkResponse,
  type ProgramResponse,
} from "@/types/pb"
import { computed, ref, watch } from "vue"

const route = useRoute()

const selected = ref<{ label: string; value: string }>()

const { state: resolutions } = useAsyncState(
  pb
    .collection(Collections.Resolution)
    .getFullList()
    .then((result) =>
      result.map((resolution) => ({
        label: resolution.name,
        value: resolution.id,
      }))
    ),
  null,
  { immediate: true }
)

const { state } = useAsyncState(
  pb
    .collection(Collections.Benchmark)
    .getFullList<BenchmarkResponse<{ program: ProgramResponse }>>({
      filter: pb.filter(
        "environment = {:environment} && average_fps > 0 && program.type = 'game'",
        {
          environment: route.params.id,
        }
      ),
      expand: "program",
    }),
  null,
  { immediate: true }
)

const data = computed(() =>
  state.value?.filter(
    (benchmark) => benchmark.resolution == selected.value?.value
  )
)

watch([resolutions], () => (selected.value = resolutions.value?.[0]))
</script>

<template>
  <main v-if="data && resolutions" class="flex h-screen flex-col gap-3">
    <div>
      <h1 class="mb-0 text-xl font-bold">Gaming Performance</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ selected?.label }}<br />
        Higher is better
      </p>
    </div>
    <div>
      <USelectMenu v-model="selected" :items="resolutions" class="w-48" />
    </div>
    <div class="flex-1">
      <GraphGames :data class="h-full" />
    </div>
  </main>
</template>
