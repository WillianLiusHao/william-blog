# instanceof
```js
function my_instanceof(leftVal, rightVal) {
  if(!leftVal || !rightVal) return false
  if(leftVal.__proto__ === rightVal.prototype) {
    return true
  } else {
    return my_instanceof(leftVal.__proto__, rightVal)
  }
}
```