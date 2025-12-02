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

// 标识符（支持 Unicode 字母和数字）
Identifier
  = id:$[^ \t\n\r{}():\"#\-]+ &{ return /^[\p{L}_][\p{L}\p{N}_]*$/u.test(id); } { return id; }

// 行注释（不吞掉换行）
comment
  = "#" [^\n\r]* { return null; }
