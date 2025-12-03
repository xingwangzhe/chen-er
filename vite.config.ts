import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ChenER",
      fileName: (format) => (format === "umd" ? `index.umd.js` : `index.js`),
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
        exports: "named",
        globals: {
          echarts: "echarts",
          "echarts/core": "echarts",
          "echarts/charts": "echarts",
          "echarts/components": "echarts",
          "echarts/features": "echarts",
          "echarts/renderers": "echarts",
        },
      },
    },
  },
});
