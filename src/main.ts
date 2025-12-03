// @ts-ignore 使用 peggy 生成的解析器（ESM，命名导出 parse）
// 生成脚本见 package.json -> scripts.pg
import { parse as peggyParse } from "../grammar/peggy/all-parser.js";
import type { ERJson } from "./type";

/**
 * 解析 ER 图文本为 AST
 * @param input 多行 ER 图定义文本
 * @returns 解析后的 AST 数组
 */
export function parseERSchema(input: string): ERJson[] {
  try {
    return peggyParse(input) as ERJson[];
  } catch (e: any) {
    console.error("解析失败:", e?.message, "\n位置:", e?.location);
    throw e;
  }
}

/**
 * 解析 ER 图文本并输出 JSON
 * @param input 多行 ER 图定义文本
 * @returns JSON 字符串
 */
export function parseERSchemaToJSON(input: string): string {
  return JSON.stringify(parseERSchema(input), null, 2);
}

// 示例用法
// const exampleSchema = `
// entity Customer {
//   customer_id  PK
//   name
//   email
// }

// entity Order {
//   order_id  PK
//   order_date
// }

// rel Customer -- Order : (1:n) "places"
// `;

// console.log("解析示例:");
// console.log(parseERSchemaToJSON(exampleSchema));
