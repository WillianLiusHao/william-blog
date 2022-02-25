// es5 寄生组合式继承
// 口诀: 向父传参，原型继承，构造修改
function Parent(name) {
  this.type = 'people'
  this.name = name
}

function Child(name, age) {
  Parent.call(this, name) // 1 向父类传参
  this.say = function() {
    console.log(`${this.type} ${name} is ${age}`)
  }
}

Child.prototype = new Parent() // 2 原型链继承
Child.prototype.constructor = Child // 3 构造器修改
let child1 = new Child('william', 18)
child1.say()

// es6继承
class Parent {
  constructor(prop) {
    this.type = 'people'
    this.name = prop.name
  }
}

class Children extends Parent {
  constructor(prop) {
    super(prop)
    this.name = prop.name
    this.age = prop.age
  }
  say() {
    console.log(`${this.type} ${this.name} is ${this.age}`)
  }
}

let child2 = new Children({name: 'william2', age: 24})
console.log(child2.__proto__.constructor)
