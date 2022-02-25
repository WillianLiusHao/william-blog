
function debouce(fn, time = 1000, immediate = false) {
  let timer = null // timer 必须放外层，因为全局上下只能有一个
  return function() {
    if(immediate && !timer) {
      fn.apply(this, arguments)
      immediate = false
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

function throttle1(fn, time = 1000, immediate = false) {
  let timer = null
  return function() {
    // 立即执行一次
    if(immediate && !timer){
      fn.apply(this, arguments)
      immediate = false
    }
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, time)
    }
  }
}

function throttle2(fn, time, immediate) {
  let timer = new Date().getTime()
  return function() {
    if(immediate) {
      fn.apply(this, arguments)
      immediate = false
    }
    if(+new Date().getTime() - +timer > time) {
      fn.apply(this, arguments)
      timer = new Date().getTime()
    }
  }
}

let i = 0, h1 = document.querySelector('h1')
let j = 0, h2 = document.querySelector('h2')
function addi() {
  i++
  h1.innerHTML = i
}

function addj() {
  j++
  h2.innerHTML = j
}

let a = debouce(addi, 3000, true)
h1.onmousemove = function() {a()}

let b = throttle1(addj, 1000, true)
h2.onmousemove = function() {b()}


