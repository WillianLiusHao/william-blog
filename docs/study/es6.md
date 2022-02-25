# ES6
## 1、let,const
- 块级作用域
- 暂时性死区
```js
console.log(a) // Uncaught ReferenceError: a is not defined
let a = 1
```

- 变量覆盖、污染
```js
var RegExp = 'lai'
console.log(window.RegExp) // lai
let a = 'hua'
console.log(window.a) // undefined
```


## 2、class
ES6 的类，完全可以看作构造函数的另一种写法

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

类的数据类型就是函数，类本身就指向构造函数


## 3、module  
es6之前主要是 __CommonJS__ 和 __AMD__  

缺点：运行时加载，无法进行静态优化

__MJS__(export & import): 编译时加载(静态加载) => 因为编译阶段加载，所以 import会变量提升

  
| 模块化 | 导入 | 导出 | 加载方式 | 文件名 | 优缺点 |
| ----  | ---- | ---- | ---- | ---- | ---- |
| ES6模块(ESM) | import | export | 异步 | .mjs | 编译时加载，可进行静态优化, export输出的接口值是实时动态的
| CommonJs模块(CJS,Node.js专用) | require | module.exports | 同步 | .cjs | 运行时加载，无法静态优化, 输出的值是缓存


