# 作用域
## 1、词法作用域( lexical scoping ) / 静态作用域 和 动态作用域

## 2、执行上下文栈

(1) 可执行代码( executable code )
- 全局代码
- 函数代码
- eval代码   



(2) 执行上下文(`execution context`)  

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”, 就叫做"执行上下文"。



(3) 执行上下文栈（Execution context stack，ECS）
```js
ECStack = [];
```
```js
function fun3() {
  console.log('fun3')
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();
```

```js
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```