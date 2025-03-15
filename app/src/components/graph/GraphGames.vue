<script setup lang="ts">
import type { BenchmarkResponse, ProgramResponse } from "@/types/pb"
import { Direction, GroupedBar, Orientation } from "@unovis/ts"
import {
  VisAxis,
  VisBulletLegend,
  VisGroupedBar,
  VisTooltip,
  VisXYContainer,
} from "@unovis/vue"
import { computed } from "vue"
import { useI18n } from "vue-i18n"

type Data = BenchmarkResponse<{ program: ProgramResponse }>

const props = defineProps<{
  data: Data[]
}>()

const { t } = useI18n({ useScope: "parent" })

const x = (_: BenchmarkResponse, i: number) => i
const y = [
  (d: BenchmarkResponse) => d.min_fps,
  (d: BenchmarkResponse) => d.average_fps,
  (d: BenchmarkResponse) => d.max_fps,
]

const tickFormat = (_: unknown, i: number) =>
  `${props.data[i].expand?.program.name}${props.data[i].raytracing ? " [RT]" : ""}`

const triggers = {
  [GroupedBar.selectors.bar]: (d: Data) =>
    `
    <span class="font-bold text-sm">${d.expand?.program?.name}</span>
${d.raytracing ? '<span class="text-xs uppercase">RAY-TRACING</span>' : ""}<br/>
    <span class="text-sm">${t("legend.fps.average")}: ${d.average_fps}</span>
`,
}

const items = computed(() => [
  { name: t("legend.fps.minimum") },
  { name: t("legend.fps.average") },
  { name: t("legend.fps.maximum") },
])
</script>

<template>
  <div class="flex h-full flex-col">
    <VisXYContainer
      :data
      :yDirection="Direction.South"
      height="100%"
      class="h-full"
    >
      <VisGroupedBar :x :y :orientation="Orientation.Horizontal" />
      <VisAxis type="x" />
      <VisAxis
        type="y"
        :tickFormat
        :tickTextWidth="100"
        :numTicks="data.length"
        :gridLine="false"
        tickTextFitMode="trim"
        tickTextTrimType="end"
      />
      <VisTooltip :triggers />
    </VisXYContainer>

    <div>
      <VisBulletLegend :items />
    </div>
  </div>
</template>
