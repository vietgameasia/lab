<script setup lang="ts">
import type {
  BenchmarkResponse,
  EnvironmentResponse,
  ProgramResponse,
} from "@/types/pb"
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

type Data = EnvironmentResponse<{
  benchmark_via_environment:
    | BenchmarkResponse<{ program: ProgramResponse }>[]
    | undefined
}>

const props = defineProps<{
  data: Data[]
}>()

const grouped = computed(() =>
  Object.values(
    Object.groupBy(
      props.data
        .flatMap((environment) => environment.expand?.benchmark_via_environment)
        .filter((benchmark) => typeof benchmark != "undefined")
        .sort((a, b) => a.disambiguation.localeCompare(b.disambiguation))
        .filter((benchmark) => !benchmark.raytracing),
      (environment) => environment.expand?.program.name ?? ""
    )
  ).map((program) => program?.slice(0, 2))
)

const { t } = useI18n({ useScope: "parent" })

const x = (_: unknown, i: number) => i
const y = computed(() =>
  Array.from({ length: 2 }).map(
    (_, i) => (d: BenchmarkResponse[]) =>
      typeof d[i] != "undefined" ? d[i].average_fps : 0
  )
)

const tickFormat = (_: unknown, i: number) =>
  grouped.value?.[i]?.[0].expand?.program.name

const triggers = {
  [GroupedBar.selectors.bar]: (
    d: BenchmarkResponse<{ program: ProgramResponse }>[]
  ) =>
    d
      .map(
        (d) => `
    <span class="font-bold text-sm">${d.expand?.program?.name}</span>
    <span class="text-sm">(${d.disambiguation})</span>
    ${d.raytracing ? '<span class="text-xs uppercase">RAY-TRACING</span>' : ""}
    <br/>
    <span class="text-sm">${t("legend.fps.average")}: ${t("legend.fps.count", [d.average_fps])}</span>
    ${d.score ? `&middot; <span class="text-sm">${t("legend.fps.score")}: ${d.score}</span>` : ""}
    <br/>
    ${
      d.min_fps || d.max_fps
        ? `<span class="text-xs">${t("legend.fps.range")}: ${t(
            "legend.fps.count",
            [d.min_fps]
          )} - ${t("legend.fps.count", [d.max_fps])}</span><br/>`
        : ""
    }
    ${d.low_fps ? `<span class="text-xs">${t("legend.fps.low")}: ${t("legend.fps.count", [d.low_fps])}</span><br/>` : ""}
`
      )
      .join("<br/>"),
}
</script>

<template>
  <div class="flex h-full flex-col">
    <VisXYContainer
      :data="grouped"
      :yDirection="Direction.South"
      height="100%"
      class="h-full"
    >
      <VisGroupedBar :x :y :orientation="Orientation.Horizontal" />
      <VisAxis type="x" label="FPS" :numTicks="10" />
      <VisAxis
        type="y"
        :tickFormat
        :tickTextWidth="100"
        :numTicks="grouped.length"
        :gridLine="false"
        tickTextFitMode="trim"
        tickTextTrimType="end"
      />

      <VisTooltip :triggers />
    </VisXYContainer>
  </div>
</template>
