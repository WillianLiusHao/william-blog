### 手写Promise
---------------
```js
class MyPromise {
  static pending = 'pending'
  static fulfilled = 'fulfilled'
  static rejected = 'rejected'
  constructor(executor) {
    this.status = MyPromise.pending
    this.value = undefined
    this.callbacks = []
    executor(this._resolve(), this._reject())
  }
  _resolve(result) {
    this.value = result
    this.status = MyPromise.fulfilled
  }
  _reject(reason) {
    if(this.status === MyPromise.pending) {
      this.value = reason
      this.status = MyPromise.rejected
    }
  }
  then(onFulfilled, onRejected) {
    this.callbacks.push({
      onFulfilled,
      onRejected
    })
  }
}
```