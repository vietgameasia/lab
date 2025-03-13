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

const selected = ref()

const { state: resolutions } = useAsyncState(
  pb.collection(Collections.Resolution).getFullList(),
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
  state.value?.filter((benchmark) => benchmark.resolution == selected.value)
)

watch([resolutions], () => (selected.value = resolutions.value?.[0].id))
</script>

<template>
  <main v-if="data && resolutions" class="h-screen">
    <USelect
      v-model="selected"
      :items="resolutions"
      label-key="name"
      value-key="id"
      class="w-48"
    />
    <GraphGames :data />
  </main>
</template>
