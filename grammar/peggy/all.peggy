// 引用公共规则
import { _ } from "./common.peggy"

// 引用实体规则
import { entity } from "./entities.peggy"

// 引用关系规则
import { rel } from "./sample.peggy"

start // 解析入口：支持实体和关系混合定义
  = _ elements:(entity / rel)* _ {
      return elements;
  }