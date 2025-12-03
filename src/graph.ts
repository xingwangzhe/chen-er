import * as echarts from "echarts/core";
import { BarChart, LineChart, GraphChart } from "echarts/charts";
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
  GraphSeriesOption,
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
  | GraphSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

import { parseERSchema } from "./main";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  GraphChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

/**
 * 渲染 ER 图到指定容器
 * @param erTag 容器的 class 名称，默认为 "chenER"
 */
const ELLIPSE_PATH = "path://M50 0 A50 50 0 1 1 49.999 0 Z";
/**
 * 将页面中包含 ER 文本的容器渲染为图形。
 * - erTag: 容器的 class 名称（默认 "chenER"）
 */
export function renderChenER(erTag?: string): void {
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
    let edges: any[] = [];

    for (const item of ast) {
      if (item.type === "entity") {
        const entityId = item.name;
        // 实体
        nodes.push({
          id: entityId,
          name: entityId,
          symbol: "rect",
          symbolSize: [Math.max(140, entityId.length * 14 + 40), 48],
          category: "entity",
          label: { show: true },
        });
        // 属性（由字段生成椭圆并连到实体）
        for (const f of item.fields) {
          const attrId = `${entityId}.${f.name}`;
          nodes.push({
            id: attrId,
            name: f.name,
            symbol: ELLIPSE_PATH, // 椭圆（由圆拉伸）
            symbolKeepAspect: false, // 允许非等比缩放
            symbolSize: [Math.max(90, f.name.length * 16), 36],
            category: "attribute",
            label: { show: true },
            itemStyle: {
              borderColor: f.pk ? "#d62728" : "#5470c6",
              borderWidth: f.pk ? 3 : 1,
            },
          });
          edges.push({ source: attrId, target: entityId });
        }
      } else if (item.type === "relation") {
        const relId = `rel:${item.name}-${item.left}-${item.right}`;
        const cards = (item as any).cardinality?.split(":") || ["", ""];
        // 关系
        nodes.push({
          id: relId,
          name: item.name,
          symbol: "diamond",
          symbolSize: [110, 60],
          category: "relation",
          label: { show: true },
          // 便于悬停时显示详细信息
          left: item.left,
          right: item.right,
          cardinality: (item as any).cardinality || "",
        });
        // 关系连实体（Chen 经典：边无箭头、无标签）
        edges.push({
          source: relId,
          target: item.left,
          name: cards[0],
        });
        edges.push({
          source: relId,
          target: item.right,
          name: cards[1],
        });
      }
    }
    container.innerHTML = "";
    const chart = echarts.init(container);
    const option: ECOption = {
      tooltip: { show: true },
      series: [
        {
          type: "graph",
          layout: "force", // 自动布局
          roam: true,
          draggable: true,
          data: nodes,
          links: edges,
          categories: [
            { name: "entity" },
            { name: "relation" },
            { name: "attribute" },
          ],
          label: { show: true, position: "inside" },
          edgeLabel: {
            show: true,
            formatter: (params: any) => params?.data?.name ?? "",
          },
          tooltip: {
            show: true,
            formatter: (params: any) => {
              if (
                params.dataType === "node" &&
                params?.data?.category === "relation"
              ) {
                const d = params.data as any;
                const lr = d.left && d.right ? `${d.left}:${d.right}` : "";
                const card = d.cardinality || "";
                const parts = [d.name, lr, card].filter(Boolean);
                return parts.join("<br/>");
              }
              return params.name || "";
            },
          },
          edgeSymbol: ["none", "none"],
          edgeSymbolSize: 10,
          lineStyle: { color: "#888", curveness: 0.2 },
          force: { repulsion: 600, edgeLength: 140, friction: 0.2 },
        },
      ],
    };
    chart.setOption(option);
    addEventListener("resize", () => chart.resize());
  }
}

/**
 * 便捷别名，兼容旧函数名。
 */
export const chenERRender = renderChenER;

/**
 * 默认导出对象，便于按需引用。
 */
export default { renderChenER };
