# call、apply、bind
```js
var person = {
  name: 'mike',
  getSkills: function(...args) {
    console.log(this.name)
    console.log(...args)
  }
}

var me = {
  name: 'william'
}
```
## call
```js
Function.prototype.mycall = function(context) {
  // 这里面的this是原对象上要执行的方法
  // context 是被指向的对象
  // console.log(this, context)
  // 给当前被指对象添加上需要的方法
  context.fn = this
  // 获取实参
  const args = Array.from(arguments).slice(1)
  const res = args.lenght > 1 ? context.fn(...args) : context.fn()
  // 删除掉被指向对象上的临时方法，防止对象呗污染
  delete context.fn
  return res
}
person.getSkills.mycall(me, 'rap', 'beatbox')
```

## apply
```js
Function.prototype.myapply = function(context) {
  context.fn = this
  const res = arguments[1] ? context.fn(...arguments[1]) : context.fn()
  delete context.fn
  return res
}
person.getSkills.myapply(me, ['rap', 'beatbox'])
```

## bind
```js
Function.prototype.mybind = function(context) {
  context.fn = this
  const args = Array.from(arguments).slice(1)
  return function() {
    const allArgs = args.concat(Array.from(arguments))
    return allArgs.length > 1 ? context.fn(...allArgs) : context.fn()
  }
}
person.getSkills.mybind(me, 'rap', 'beatbox')('dance')
```