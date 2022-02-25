// console.log('number', typeof 1)
// console.log('string', typeof '1')
// console.log('boolean', typeof false)
// console.log('undefinde', typeof undefined)

// console.log('null', typeof null)
// console.log('null', null === null)

// console.log('array', typeof [])
// console.log('array', [] instanceof Array)

// console.log('object', typeof {})
// console.log('array', {} instanceof Object)

// console.log(typeof function(){})
// console.log(typeof 2n)
// console.log(typeof Symbol(2))


function my_instanceof(leftVal, rightVal) {
  if(!leftVal || !rightVal) return false
  if(leftVal.__proto__ === rightVal.prototype) {
    return true
  } else {
    return my_instanceof(leftVal.__proto__, rightVal)
  }
}

class Grandpa {}
class Father extends Grandpa {}
class Son extends Father {}
var son1 = new Son()
var father1 = new Father()


console.log(my_instanceof(son1, Object))
console.log(my_instanceof(Son, Son))
console.log(my_instanceof(father1, Father))
console.log(my_instanceof(father1, Grandpa))
console.log(my_instanceof(null, null))