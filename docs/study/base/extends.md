# 继承
```js
function Parent () {
  this.hobby = ['sing', 'dance'];
}
Parent.prototype.getHobby = function () {
  console.log(this.hobby);
}
```
------------------
## 1、原型链继承

```js
function Child () {}
Child.prototype = new Parent()

// let child1 = new Child()
// console.log(child.getHobby())
```
问题:
- 引用类型的属性被所有实例共享
- 在创建 Child 的实例时，不能向Parent传参`

------------------
## 2、经典继承(借用构造函数)
```js
function Child() {
  Parent.call(this)
}

// let child1 = new Child()
// console.log(child.getHobby())
```
优点：
- 避免了引用类型的属性被所有实例共享
- 可以在 Child 中向 Parent 传参

------------------
## 3、组合继承`(最常用)`
```js
function Child (name, age) {
  Parent.call(this, name);  // 1、向父类传参
  this.age = age;
}
Child.prototype = new Parent() // 2、修改原型，构造原型链
Child.prototype.constructor = Child  // 3、修改原型的构造函数指向
// let child1 = new Child()
```
问题：
- 调用了两次 Parent 构造函数
导致不仅 `child1` 中有 hobby 属性, `Child.prototype` 中也有 hobby 属性

--------------------
## 4、寄生组合式继承
```js
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
/* 重点来了 */
let F = function() {}
F.prototype = Parent.prototype
Child.prototype = new F()
// let child1 = new Child()
```