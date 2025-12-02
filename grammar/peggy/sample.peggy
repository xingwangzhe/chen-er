// 引用公共规则
import { Identifier, hws, newline, _ , __, comment } from "./common.peggy"

start // 解析入口 
    = _ rels:rel+ _ { return rels; }


rel // 关系定义：rel 实体1 -- 实体2 (基数) "关系名"
    = _ "rel" __ left:Identifier __ "--" __ right:Identifier _ "(" card:Cardinality ")" _ name:QuotedString _ comment? newline? {
        return { type: "relation", left, right, cardinality: card, name };
    }

// 基数：如 1:n, m:n, 1:1
Cardinality
    = chars:[^)]* { return chars.join("").trim(); }

// 双引号字符串
QuotedString
    = '"' chars:[^"]* '"' { return chars.join(""); }
