<script setup lang="ts">
import { pb } from "@/utils/client"
import { useRoute } from "vue-router"
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

const { state: environment } = useAsyncState(
  pb.collection(Collections.Environment).getOne<
    Pick<
      EnvironmentResponse<{
        cpu: Pick<CpuResponse, "name">
        gpu_variant: Pick<GpuVariantsResponse, "name">
        benchmark_via_environment: BenchmarkResponse<{
          program: ProgramResponse
        }>[]
      }>,
      "expand"
    >
  >(route.params.id as string, {
    expand: "cpu, gpu_variant,  benchmark_via_environment.program",
    fields:
      "expand.cpu.name, expand.gpu_variant.name, expand.benchmark_via_environment",
  }),
  null,
  { immediate: true }
)

const data = computed(() =>
  environment.value?.expand?.benchmark_via_environment.filter(
    (benchmark) => benchmark.resolution == selected.value?.value
  )
)

watch([resolutions], () => (selected.value = resolutions.value?.[0]))
</script>

<template>
  <main
    v-if="data && resolutions && environment"
    class="flex h-screen flex-col gap-3 p-3"
  >
    <div>
      <a href="https://vietgame.asia/">
        <img
          :src
          class="float-right h-10 dark:hue-rotate-180 dark:invert-100"
        />
      </a>
      <h1 class="mb-0 text-xl font-bold">{{ $t("benchmark.gaming") }}</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ environment.expand?.cpu.name }} &middot;
        {{ environment.expand?.gpu_variant.name }} &middot;
        {{ selected?.label }}
      </p>
    </div>
    <div>
      <USelectMenu v-model="selected" :items="resolutions" class="w-48" />
    </div>
    <div class="flex-1">
      <GraphGames :data />
    </div>
  </main>
</template>
