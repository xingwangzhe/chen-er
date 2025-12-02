// Peggy 语法通用规则库

_  // 可选空白 + 注释
  = (comment / [ \t\n\r])*

__ // 至少一个空白字符
  = [ \t\n\r]+

// 行内空白（不含换行）
hws = [ \t]*

// 跨平台换行符
newline
  = "\r\n" / "\n" / "\r"

// 标识符（目前仅支持 ASCII，后续可扩展 Unicode）
Identifier
  = $([A-Za-z_][A-Za-z0-9_]*)

// 行注释（不吞掉换行）
comment
  = "#" [^\n\r]* { return null; }
