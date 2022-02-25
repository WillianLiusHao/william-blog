// 口诀: 类型判断，数对返回，属性自有，递归取值
function cloneDeep(data) {
  if(data === null || !typeof data !== 'object') return data // 
  let res = data instanceof Array ? [] : {}
  for(let i in data) {
    if(data.hasOwnProperty(i)) {
      res[i] = cloneDeep(data[i])
    }
  }
  return res
}

var obj = {
  name: 'william',
  age: 12,
  girlfriends: [
    {name: 'lili'},
    {name: 'lulu', age:22}
  ],
  wife: undefined
}
var arr = [
  {name: 123},
  '12'
]

console.log(cloneDeep(obj))
console.log(cloneDeep(arr))
