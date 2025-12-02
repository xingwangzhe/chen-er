
// 引用公共规则
import { Identifier, hws, newline, _ , __, comment } from "./common.peggy"

// start   // 解析入口
//   = _ entities:entity+ _ { return entities; } 

// 注释在 common.peggy 中

    
entity // 解析实体定义（允许前置空白）
  = _ "entity" __ name:Identifier _ "{" _ fields:fieldBlock _ "}" {
        return { type: "entity", name: name, fields: fields };
    }

// 字段块：零到多行字段，每行以换行结束
fieldBlock
  = fieldLine*

fieldLine // 解析多行字段定义（行首至少一个空白，避免空匹配；行尾可注释）
  = hws f:field hws comment? hws newline { return f; }

field // 解析字段定义（行内不吞换行）
  = name:Identifier hws pk:("PK")? {
    return { type: "field", name, pk: pk !== null };
    }

