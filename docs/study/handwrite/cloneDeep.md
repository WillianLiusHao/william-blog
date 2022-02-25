### 深浅克隆
---------------
**拷贝注意事项**
- 入口先判断是否对象类型数据
- 根据数据类型进行新建 对象/数组
- 遍历后记得判断属性是否在当前对象上 (防止复制了原型链上的属性)

```js
// 浅克隆: Object.assign()  拓展运算符
const _cloneShallow = (target) => {
  if(!target || typeof target !== "object") return
  let newObj = Array.isArray(target) ? [] : {}
  for(let key in target) {
    if(target.hasOwnProperty(key)) {
      newObj[key] = target[key]
    }
  }
  return newObj
}

const _cloneDeep = (target) => {
  if(!target || typeof target !== "object") return
  let newObj = Array.isArray(target) ? [] : {}
  for(let key in target) {
    if(target.hasOwnProperty(key)) {
      let value = target[key]
      newObj[key] = typeof value === "object" ? _cloneDeep(target[key]) : target[key]
    }
  }
  return newObj
}

var people = {
  name: 'william',
  age: 24,
  sex: 1,
  girlfriend: {
    name: undefined
  },
  hasGirlFriend: ()=> {
    console.log('醒醒')
    return false
  },
  hobby: ['basketball', 'rap', 'sing'],
}
var deep = _cloneDeep(people)
var shallow = _cloneShallow(people)

console.log(deep, shallow)



```