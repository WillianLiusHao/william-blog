function cb (val) {
  /* 渲染视图 */
  console.log("视图更新啦～");
}

// 数据转成响应式
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    get: function reactiveGetter  () {
      // 收集依赖
      return val
    },
    set(newVal) {
      if(newVal === val) return
      cb(newVal)
    }
  })
}

// 观测数据
function observe(value) {
  if(!value || typeof value !== 'object') return
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

// Vue 类
class _Vue {
  constructor(props) {
    this._data = props.data
    observe(this._data)
  }
}

let vuedemo = new _Vue ({
  data: {
    name: "william"
  }
})
vuedemo._data.name = 'hohn'
console.log(vuedemo._data.name);