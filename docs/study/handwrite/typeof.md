### 类型判断
---------------
**数据类型：**
1、基础类型  
- Number
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt  

2、引用类型
- Object
- Function
- Array

注意点:   
`基础类型除null直接返回， 因为typeof null === "object" 所以需要对null特殊处理`  
`引用类型使用toString方法，然后截取字符串`
```js
function getType(data) {
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase()
}
```