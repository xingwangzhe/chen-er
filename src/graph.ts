import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from "echarts/charts";
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

import { parseERSchema } from "./main";
import type { ERJson } from "./types";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

/**
 * 渲染 ER 图到指定容器
 * @param erTag 容器的 class 名称，默认为 "chenER"
 */
export function chenERRender(erTag?: string): void {
  const containers = document.getElementsByClassName(
    erTag || "chenER"
  ) as HTMLCollectionOf<HTMLElement>;

  if (!containers) {
    throw new Error("Container element not found");
  }

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    // 获取容器内的文本内容作为 ER 图定义
    const erText = container.textContent || "";
    // 解析 ER 图
      const ast = parseERSchema(erText);
      let nodes: any[] = [];
      let links: any[] = [];
      for (const item of ast) {
          if (item.type === "entity") { 
              
          }
  }
}
