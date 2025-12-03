import { defineConfig } from "vite";

// 导出两个构建配置（后续将把 CDN 配置放到单独文件中）：
// 1) library（外部化依赖）→ dist/index.js （ESM，仅供打包器/本地项目使用）
// 2) cdn（自包含依赖）→ dist/index.ems.js（ESM）与 dist/index.umd.js（UMD），用于单文件 CDN 引入
const libConfig = defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ChenER",
      fileName: () => `index.js`,
      formats: ["es"],
    },
    rollupOptions: {
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
      },
    },
  },
});

export default libConfig;
