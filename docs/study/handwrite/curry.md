### 柯里化
---------------
```js
function curring(fn) {
  var originArg = Array.prototype.slice.call(arguments, 1)
  return function() {
    var combineArg = originArg.concat(Array.from(arguments).slice())
    return fn.call(this, combineArg)
  }
}

var add = (array) => {
  let sum = 0
  for(let i of array) {
    sum += i
  }
  return sum
}

var a = curring(add, 1,2)
a(3)
```