_
    = [ \t\n\r]* // 可存在的空白字符

__
    = [ \t\n\r]+ // 至少一个空白字符

start   //解析入口
    = _ entities:entity+ _ { return entities; } 



entity // 解析实体定义
    = "entity" __ name:Identifier _ "{" _ fields:field* _ "}" {
        return { type: "entity", name: name, fields: fields };
    }

field // 解析字段定义
  = name:Identifier _ pk:("PK") // 可选主键标记
    ? _ newline {
    return { type: "field", name, pk: pk !== null };
    }

newline // 解析换行符
  = [\n\r]+

Identifier // 支持 Unicode 字符的标识符
  = $([_\p{L}][_\p{L}\p{N}]*)