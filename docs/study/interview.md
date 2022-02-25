# 面试合集
## ES6合集
1、了解元编程吗？说说你对es6中元编程的理解  
[元编程-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Meta_programming)


## 算法面试题合集
```js
旋转数组
/**
 * @param {Array} arr [1,2,5,4,3,2]
 * @param {number} k 2
 * @return {Array} [5,4,3,2,1,2]
*/
function moveArr(arr, k) {
  while(k > 0) {
    const firstEle = arr[0]
    arr.shift(firstEle)
    arr.push(firstEle)
    k --
  }
  return arr
}
// console.log(moveArr([-1, -100, 3, 99], 2))
```

```js
移动零
/**
 * @param {Array} arr [0,1,0,3,12]
 * @return {Array} [1,3,12,0,0]
*/
function moveZero(arr) {
  const moveIndex = []
  for(let i = 0; i<arr.length; i++) {
    if(arr[i] === 0) {
      moveIndex.unshift(i)
    }
  }
  moveIndex.forEach(index => {
    arr.splice(index, 1)
    arr.push(0)
  })
  return arr
}
// console.log(moveZero([5,1,2,0,0,4,3,0,0,0]))
```

```js
两数之和
/**
 * @param {Array} arr [1, 4, 5, 2, 7]
 * @param {number} target 7
 * @return {Array} [2, 3]
*/
function findAnswer(arr, target) {
  for(let i = 0; i<arr.length; i++) {
    const other = target - arr[i]
    const index = arr.findIndex(x => x === other)
    if(index>-1) {
      return([i, index])
    }
  }
}
// console.log(findAnswer([1, 4, 5, 2, 7], 7))
```

```js
逆序字符串
/**
 * @param {int} num 1234
 * @return {string} '4321'
*/
function resetStr(num) {
  const num1 = Math.floor(num/10)
  const num2 = num % 10
  if(num1 > 0) {
    return `${num2}${resetStr(num1)}`
  } else {
    return `${num}`
  }
}
// console.log(resetStr(4321))
```

```js
字符串解码(腾讯19年半年高频题(17次))
/**
 *@param {string} 'a2[bc]'
 *@return {string} 'abcbc'
*/
function decodeStr(s) {
  // 存放 【重复次数】 的栈
  let countStack = [];
  // 存放 【累积字符串】 的栈
  let resStack = [];
  // 用来累积的字符串 res
  let res = "";
  // 表示重复次数
  let multi = 0;
  for (let i = 0; i < s.length; i++) {
    let cur = s.charAt(i);
    if (cur == '[') {
      // 双双压栈，保存了当前的状态
      countStack.push(multi);
      resStack.push(res);
      // 纷纷置空，准备下面的累积
      multi = 0;
      res = "";
    } else if (cur == ']') {
      // 遇到 ]，表示累积结束，要算账了。
      // 【当前的串出现多少次】还保存在栈中，把它取出来
      let count = countStack.pop();
      let temp = "";
      // 让 [ 和 ] 之间的字符串(就是累积字符串res)重复 count 次
      for(let i = 0; i < count; i++) {
        temp += res;
      }
      // 和前面已经求得的字符串进行拼接
      res = resStack.pop() + temp;
    } else if (cur >= '0' && cur <= '9') {
      // multi累积
      multi = multi * 10 + (cur - '0');
    } else {
      // 字符累积
      res += cur;    
    }
  }
  return res;
}
```


```js
链表翻转

```

## 网易
> 1、熟悉webpack? 首屏优化? 如何代码分割?
`首屏优化`  
* Skeleton Screen (骨架屏)
* 图片懒加载(vue-lazyload)
* 通过CDN的方式引入，减少vendor.js体积
* gizp压缩


> 2、vuex, 单一状态树优点跟缺点？ 当状态冲突了怎么办？例如编辑A商品时候又去编辑B商品

> 3、虚拟dom? 优点? diff算法?

> 4、http1跟htt2区别

> 5、localstorage怎么设置过期时间
``` js
class Storage {
  constructor(name) {
    this.name = "storage";
  }
  //设置缓存
  setItem(params) {
    let obj = {
      name: "",
      value: "",
      expires: "",
      startTime: new Date().getTime(), //记录何时将值存入缓存，毫秒级
    };
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      let type = Object.prototype.toString.call(options.value);
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (Object.prototype.toString.call(options.value) == "[object Object]") {
        options.value = JSON.stringify(options.value);
      }
      if (Object.prototype.toString.call(options.value) == "[object Array]") {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  }
  //拿到缓存
  getItem(name) {
    let item = localStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      let date = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name);
        return false;
      } else {
        //缓存未过期，返回值
        return item.value;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item;
    }
  }
  //移出缓存
  removeItem(name) {
    localStorage.removeItem(name);
  }
  //移出全部缓存
  clear() {
    localStorage.clear();
  }
}
```