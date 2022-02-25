function New() {
  let args = Array.from(arguments)
  const _constructor = args[0]
  args.shift()
  if(typeof _constructor !== 'function') return
  // 1、创建新对象
  let obj = {}
  // 2、原型链构造
  obj.__proto__ = _constructor.prototype
  // 3、传参并执行构造函数
  let res = _constructor.apply(obj, args)
  // 4、判断返回值
  return typeof res === 'object' ? res : obj
}