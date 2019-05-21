module.exports = {
  parser: "babel-eslint",
  plugins: ["react"],
  rules: {
    // 基数必填
    radix: "error",
    // 代码缩进
    indent: [1, 2, {
      SwitchCase: 1
    }],
    // jsdoc注释规范
    "require-jsdoc": [
      "warn",
      {
        "require": {
          "ClassDeclaration": true,
          "FunctionDeclaration": true,
        }
      }
    ],
    // 最大长度
    "max-len": [1, { "code": 100 } ],
    // 不允许多个空行
    "no-multiple-empty-lines": 2,
    // 允许经声明却未使用的变量
    "no-unused-vars": 0,
    // 不规定箭头函数 body 是否出现 return
    "arrow-body-style": 0,
    // 注释后忽略是否加空格
    "spaced-comment": 0,
    // 禁止出现空语句块
    "no-empty": ["error", { "allowEmptyCatch": true }],
    // 要求或禁止使用分号代替 ASI
    "semi": ["error", "always"],
    // 要求操作符周围有空格
    "semi-spacing": "error",
    // 强制分号之前和之后使用一致的空格
    "space-infix-ops": ["error", { "int32Hint": false }],
    // () [] 内部两边可选是否添加空格
    "space-in-parens": 0,
    // 禁止不必要的布尔转换
    "no-extra-boolean-cast": "error",
    // 允许三目表达式中使用boolean类型的条件
    "no-unneeded-ternary": 0,
    // 多行时每个对象内的属性必须加上逗号结尾
    "comma-dangle": [2, "only-multiline"],
    // 仅允许修改方法参数的属性
    "no-param-reassign": 0,
    // 允许 console 语句
    "no-console": 0,
    //对象每个字段前不允许空格，字段后的空格至少为1个
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
    // 强制数组方括号中使用一致的空格
    "array-bracket-spacing": ["error", "never"],
    // 允许在函数定以前使用函数，不允许在类定义前使用类
    "no-use-before-define": [2, { "functions": false, "classes": true }],
    // 对象中的方法需要简写
    "object-shorthand": [2, "methods"],
    // 允许多层级三目表达式
    "no-nested-ternary": 0,
    // 除括号之外，条件语句中不允许条件中包含赋值表达式和“==”表达式
    "no-cond-assign": [2, "except-parens"],
    // 不强制驼峰命名
    "camelcase": 0,
    // 强制在大括号中使用一致的空格
    "object-curly-spacing": ["error", "always"],
    // 允许switch语句的case匹配基本类型以外的值
    "no-case-declarations": 0,
    // 允许表达式直接作为语句
    "no-unused-expressions": 0,
    // 允许a标签设置单行js语句
    "no-script-url": 0,
    // 不强制定义const
    "prefer-const": 0,
    // 允许不同作用域出现同样的变量名
    "no-shadow": 0,
    // 忽略函数名必需定义，不做限制
    "func-names": 0,
    // 不强制在方法末尾进行return
    "consistent-return": 0,
    // 允许在循环中声明函数
    "no-loop-func": 0,
    // 允许带引号的对象属性
    "quote-props": 0,
    // 不强制箭头函数
    "prefer-arrow-callback": 0,
    // 不强制在return后有else
    "no-else-return": 0,

    // 后边的标准需要再考虑
    // 不限制 block 前是否有空格
    "space-before-blocks": 0,
    // 不限制 block 中首尾是否需要空格
    "block-spacing": 0,
    // 忽略 new 对象以大写开头
    "new-cap": 0,
    // 忽略重复引用
    "no-duplicate-imports": 0,

    "standard/object-curly-even-spacing": 0,
    "standard/array-bracket-even-spacing": 0
  }
}
