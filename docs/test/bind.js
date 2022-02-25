

Function.prototype.myBind = function() {
  let args = Array.prototype.slice.call(arguments)
  const fn = this
  let bindObj = args.shift()
  return function() {
    fn.apply(bindObj, args)
  }
}

function say(msg) {
  console.log(`${this.name} say ${msg}`)
}


say.myBind({name: 'join'}, 'hello')()