function addNum(num1, num2) {
  let weishu1 = num1.toString().split('.')[1] && num1.toString().split('.')[1].length || 0
  let weishu2 = num2.toString().split('.')[1] && num2.toString().split('.')[1].length || 0
  let calNum = Math.pow(10, Math.max(weishu1, weishu2))
  console.log(weishu1, weishu2, calNum)
  return (num1 * calNum + num2 * calNum) / calNum
}

console.log(addNum(1.00, 2.02))