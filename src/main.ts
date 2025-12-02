// @ts-ignore - 编译时生成的解析器
import parser from "../grammar/out/all-parser.js";
import type { ERJson } from "./types.js";

/**
 * 解析 ER 图文本为 AST
 * @param input 多行 ER 图定义文本
 * @returns 解析后的 AST 数组
 */
export function parseERSchema(input: string): ERJson[] {
  try {
    return parser.parse(input) as ERJson[];
  } catch (error: any) {
    console.error("解析失败:", error.message);
    if (error.location) {
      console.error("位置:", error.location);
    }
    throw error;
  }
}

/**
 * 解析 ER 图文本并输出 JSON
 * @param input 多行 ER 图定义文本
 * @returns JSON 字符串
 */
export function parseERSchemaToJSON(input: string): string {
  const ast = parseERSchema(input);
  return JSON.stringify(ast, null, 2);
}

// 示例用法
const exampleSchema = `
entity Customer {
  customer_id  PK
  name
  email
}

entity Order {
  order_id  PK
  order_date
}

rel Customer -- Order : (1:n) "places"
`;

console.log("解析示例:");
console.log(parseERSchemaToJSON(exampleSchema));
