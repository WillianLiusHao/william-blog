# Computed和Watch
--------------------
**一、computed 应用场景**

1. 适用于一些重复使用数据或复杂及费时的运算。我们可以把它放入computed中进行计算, 然后会在computed中 **`缓存`** 起来, 下次就可以直接获取了。

2. 如果我们需要的数据依赖于其他的数据的话, 我们可以把该数据设计为computed中。
---------------------

**二、computed 和 methods 的区别**
1. computed 是基于响应性依赖来进行缓存的。只有在响应式依赖发生改变时它们才会重新求值。  

   也就是说, 当msg属性值没有发生改变时, 多次访问 reversedMsg 计算属性会立即返回之前缓存的计算结果, 而不会再次执行computed中的函数。  

   但是methods方法中是每次调用, 都会执行函数的, methods它不是响应式的。  

2. computed中的成员可以只定义一个函数作为只读属性, 也可以定义成 get/set变成可读写属性, 但是methods中的成员没有这样的。
---------------------


**三、watch**  

**`handler、immediate、deep`**

```js
// 默认写法
watch: {
  age(newVal, oldVal) {}
}
// handle写法
watch: {
  age: {
    handle(newVal, oldVal) {},
    immediate: true, // 设置后会在页面首次加载的时候立即执行watch操作
    deep: true // 用于监听对象内部属性的变化，监听数组不需要
  }
}
```
---------------------
**四、computed 和 watch 的区别**

相同点：他们两者都是观察页面数据变化的。

不同点：computed只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据。
    watch每次都需要执行函数。watch更适用于数据变化时的异步操作。
    

