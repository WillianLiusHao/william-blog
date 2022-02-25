# Vue3
### 1、vue3中import的组件需要加上.vue后缀  

### 2、setup相关  
##### `父子组件传值 setup(props, context)`  
props和context.attrs的区别
- props需先在子组件中声明才能取到值,attrs不需要
- props声明过的不会,attrs不会再出现
- props不包括事件,attrs包含
- attrs的值只能是 `string`

### 3、shallowReactive & shallowRef  
在vue3中,reactive和ref会把对象封装成proxy以便数据劫持，在多层次的对象中会造成一定程度的性能消耗，可以通过 `shallowReactive & shallowRef` 进行优化，这两个API只会对对象的第一层进行封装proxy，是浅层监听  
其中shallowRef监听的数据改变不会进行视图的更新，需配合`triggerRef`进行使用

### 4、provide & inject  
- provide ：向子组件以及子孙组件传递数据。接收两个参数，第一个参数是 `key`，即数据的名称；第二个参数为 `value`，即数据的值
- inject ：接收父组件或祖先组件传递过来的数据。接收一个参数 `key`，即父组件或祖先组件传递的数据名称

### 5、watch & watchEffect  
##### `watch：watch( source, cb, [options] )`
- source：可以是表达式或函数，用于指定监听的依赖对象
- cb：依赖对象变化后执行的回调函数
- options：可参数，可以配置的属性有 immediate（立即触发回调函数）、deep（深度监听）
``` javascript
// 监听ref数据时
const state = ref(0)
watch(state, (newVal, oldVal) => {})

// 监听reactive数据时
const state = reactive({count: 0, name: 'william'})
watch(() => state.count, (newVal, oldVal) => {})
watch([() => state.count, () => state.name], (newVal, oldVal) => {})
```
##### `watchEffect`
```javascript
const state = reactive({count: 0, name: 'william'})
watchEffect(() => {
  console.log(state.count)
  console.log(state.name)
})
```
`watchEffect, 与 watch 的区别主要有以下几点：`
- 不需要手动传入依赖
- 每次初始化时会执行一次回调函数来自动获取依赖
- 无法获取到原值，只能得到变化后的值