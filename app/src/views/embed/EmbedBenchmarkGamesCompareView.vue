<script setup lang="ts">
import { pb } from "@/utils/client"
import { useRoute, type LocationQueryValue } from "vue-router"
import { useAsyncState } from "@vueuse/core"
import {
  Collections,
  type BenchmarkResponse,
  type CpuResponse,
  type EnvironmentResponse,
  type GpuVariantsResponse,
  type ProgramResponse,
} from "@/types/pb"
import { computed, ref, watch } from "vue"
import src from "@/assets/vietgame.png"
import GraphGamesCompare from "@/components/graph/GraphGamesCompare.vue"

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

const { state: environments } = useAsyncState(
  pb.collection(Collections.Environment).getFullList<
    EnvironmentResponse<{
      cpu: Pick<CpuResponse, "name">
      gpu_variant: Pick<GpuVariantsResponse, "name">
      benchmark_via_environment: BenchmarkResponse<{
        program: ProgramResponse
      }>[]
    }>
  >({
    expand: "cpu, gpu_variant, benchmark_via_environment.program",
    fields:
      "expand.cpu.name, expand.gpu_variant.name, expand.benchmark_via_environment",
    filter: pb.filter(`(${buildFilter("id", route.query.id)})`),
    sort: "+benchmark_via_environment.disambiguation",
  }),
  null,
  { immediate: true }
)

const data = computed(() =>
  environments.value?.map((environment) => ({
    ...environment,
    expand: {
      ...environment.expand,
      benchmark_via_environment:
        environment.expand?.benchmark_via_environment.filter(
          (benchmark) => benchmark.resolution == selected.value?.value
        ),
    },
  }))
)

const devices = computed(() =>
  environments.value?.map(
    ({ expand }) => `${expand?.cpu.name}, ${expand?.gpu_variant.name}`
  )
)

watch([resolutions], () => (selected.value = resolutions.value?.[0]))

function buildFilter(
  key: string,
  id: LocationQueryValue[] | LocationQueryValue
) {
  if (!id) {
    return ""
  }

  if (typeof id == "string") {
    return pb.filter(`${key} = {:environment}`, { environment: id })
  }

  return id
    .map((environment) =>
      pb.filter(`${key} = {:environment}`, {
        environment,
      })
    )
    .join(" || ")
}
</script>

<template>
  <main
    v-if="data && resolutions && environments"
    class="flex h-screen flex-col gap-3 p-3"
  >
    <div>
      <a href="https://vietgame.asia/">
        <img
          :src
          class="float-right h-10 dark:hue-rotate-180 dark:invert-100"
        />
      </a>
      <h1 class="mb-0 text-xl font-bold">
        {{ $t("benchmark.compare.gaming") }}
      </h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        <div v-if="devices">
          <div v-for="device in devices" :key="device">{{ device }}</div>
        </div>
      </p>
    </div>
    <div>
      <USelectMenu v-model="selected" :items="resolutions" class="w-48" />
    </div>
    <div class="flex-1">
      <GraphGamesCompare :data />
    </div>
  </main>
</template>
