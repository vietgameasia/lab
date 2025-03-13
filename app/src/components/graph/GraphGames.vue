<script setup lang="ts">
import type { BenchmarkResponse, ProgramResponse } from "@/types/pb"
import { Direction, Orientation, StackedBar } from "@unovis/ts"
import {
  VisAxis,
  VisBulletLegend,
  VisStackedBar,
  VisTooltip,
  VisXYContainer,
} from "@unovis/vue"

const props = defineProps<{
  data: BenchmarkResponse<{ program: ProgramResponse }>[]
}>()

const x = (_: BenchmarkResponse, i: number) => i
const y = [
  (d: BenchmarkResponse) => d.average_fps,
  (d: BenchmarkResponse) => d.min_fps,
  (d: BenchmarkResponse) => d.max_fps,
]

const tickFormat = (_: unknown, i: number) =>
  `${props.data[i].expand?.program.name}${props.data[i].raytracing ? " [RT]" : ""}`

const triggers = {
  [StackedBar.selectors.bar]: (d: BenchmarkResponse) =>
    `
      <span>${d.average_fps}</span>
    `,
}

const items = [
  { name: "Average FPS" },
  { name: "Minimum FPS" },
  { name: "Maximum FPS" },
]
</script>

<template>
  <VisXYContainer :data :yDirection="Direction.South">
    <VisStackedBar :x :y :orientation="Orientation.Horizontal" />
    <VisAxis type="x" />
    <VisAxis
      type="y"
      :tickFormat
      :tickTextWidth="100"
      :numTicks="data.length"
      :gridLine="false"
    />
    <VisTooltip :triggers />
  </VisXYContainer>

  <div>
    <VisBulletLegend :items />
  </div>
</template>
