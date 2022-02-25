### 防抖、节流
---------------
```js
function debounce(fn, time, immediate) {
  let timer = null
  return function() {
    let args = arguments

    if(immediate && !timer) {
      fn.apply(this, args)
      immediate = false
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

function throttle(fn, time, immediate) {
  let timer = null
  return function() {
    let args = arguments

    if(immediate && !timer) {
      fn.apply(this, args)
      immediate = false
    }
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, time)
    }
  }
}
```