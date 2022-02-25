// 方法1： 不抛出错误，请求失败的时候，直接重发请求
// const request1 = val => {
//   return new Promise((resolve, reject) => {
//     if(Math.random() > 0.5) {
//       // 随机请求成功
//       console.log(val, '请求成功')
//       resolve(val)
//     } else {
//       console.log(val, '请求失败')
//       resolve(request1(val))
//     }
//   })
// }

// Promise.all([request1('A'), request1('B'), request1('C'), request1('D')]).then(res => {
//   console.log('请求全部成功了', res);
// }).catch(err => {
//   console.log('请求有失败', err)
// })

// 方法2，抛出错误的位置捕获错误，然后对错误的请求重新发送
const request2 = val => {
  return new Promise((resolve, reject) => {
    if(Math.random() > 0.5) {
      // 随机请求成功
      console.log(val, '请求成功')
      resolve(val)
    } else {
      console.log(val, '请求失败')
      reject()
    }
  }).catch(err => {
    request2(1)
  })
}

Promise.all([request2('A'), request2('B'), request2('C'), request2('D')]).then(res => {
  console.log(1, res);
}).catch(err => {
  console.log(2, err)
})


