import { defineConfig } from "vite";

// 自包含 CDN 构建：产出 dist/index.ems.js（ESM）与 dist/index.umd.js（UMD）
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/index.ts",
      name: "ChenER",
      fileName: (format: string) =>
        format === "umd" ? `index.umd.js` : `index.ems.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // 不外部化依赖，确保单文件可用
      output: {
        // 在产物开头注入运行时 shim，确保浏览器下存在 process
        banner:
          "(function(){ try{ var g = typeof globalThis!=='undefined'?globalThis:window; g.process = g.process || { env: {} }; }catch(_){} })();",
        exports: "named",
        globals: {
          echarts: "echarts",
        },
      },
    },
  },
  define: {
    "process.env": "{}",
    process: "({ env: {} })",
  },
});
