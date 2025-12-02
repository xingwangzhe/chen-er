/**
 * 字段定义
 */
export interface ERField {
  type: "field";
  name: string;
  pk: boolean;
}

/**
 * 实体定义
 */
export interface EREntity {
  type: "entity";
  name: string;
  fields: ERField[];
}

/**
 * 关系定义
 */
export interface ERRelation {
  type: "relation";
  left: string;
  right: string;
  cardinality: string;
  name: string;
}

/**
 * ER 图 JSON 节点类型
 */
export type ERJson = EREntity | ERRelation;
