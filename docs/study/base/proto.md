# 原型链理解
**请先认真看并理解下图**  

**原型链就是指各个实例通过`__proto__`链接起来的一条链**
![prototype](/docs/.vuepress/public/img/prototype.png)


```js
// 构造函数
function Person() {
  this.sex = '男'
}
// 创建对象
let person = new Person()
Person.prototype.name = 'william'
console.log(person.sex) // 男
console.log(person.name)  // william
```

**1、函数有自己的原型(`prototype`),原型是个对象,原型对象有构造器(constructor)，指向对应的构造函数**
```js
Person.prototype.constructor === Person  //true
```
**2、对象(/实例)有自己的实例原型(`__proto__`),指向构造函数的原型**
```js
person.__proto__ === Person.prototype
```
**3、原型是个对象，也有自己的实例原型，指向Object.prototype**
```js
/* 因为Person.prototype是个对象，是由 new Object()创建的
   也就是说Person.prototype是由构造函数 function Object() {} 进行new创建的
   由2知道，对象（/实例）指向构造函数的原型 => Person.prototype.__proto__ = Object.prototype
*/
```

