const curring = (fn) => {
  let params = []
  const next = (...args) => {
    params = [...params, ...args]
    console.log(params);
    if(params.length < fn.length) {
      return next
    } else {
      return fn.apply(fn, params)
    }
  }
  return next
}



const sum = (a,b,c,d) => {
  return a+b+c+d
}

const test = curring(sum)
const res1 = test(1,2,3,4)
console.log(res1);