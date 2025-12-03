import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/graph.ts",
      name: "ChenER",
      fileName: (format) => `chen-er.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // 将外部依赖标记为 external，避免打包进库
      external: [
        "echarts",
        "echarts/core",
        "echarts/charts",
        "echarts/components",
        "echarts/features",
        "echarts/renderers",
      ],
      output: {
        globals: {
          echarts: "echarts",
        },
      },
    },
  },
});
