# new
## new干了什么
- (1) 创建了一个空对象
- (2) 设置原型，将对象的原型设置为函数的 prototype 对象
- (3) 将函数的this 指向新对象，然后执行构造函数的代码(为这个对象添加相关属性)
- (4) *判断函数的返回类型,如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象  
  
  
## new的效果
- 创建的实例可以访问构造函数内的所有属性
- 创建的实例可以访问构造函数 prototype 上的属性   
  
  
## new的实现
```js
function objectFactory() {
  let newObj = new Object()  // 创建空对象
  const constructor = [].shift.call(arguments)  // 获取构造器
  newObj.__proto__ = constructor.prototype // 确定对象的原型
  let res = constructor.apply(newObj, arguments) // 执行构造函数，获取构造函数上的属性
  return typeof res === 'Object' ? res : newObj // 若构造函数返回的是引用类型，则直接返回那个引用
}

objectFactory(Fn, 'william', 1)
```