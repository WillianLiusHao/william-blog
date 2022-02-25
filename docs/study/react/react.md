# 基本概念
## 1、JSX语法  
__所谓的 JSX 其实就是 JavaScript 对象。__

JSX：
``` html
<div class='box' id='content'>
  <div class='title'>Hello</div>
  <button>Click</button>
</div>
```
编译后：  
```javascript
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```
解析及渲染过程如下： 

![Image text](/.vuepress/public/img/JSX.png)

## 2、事件监听
React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。
```javascript
class Title extends Component {
  handleClickOnTitle (word, e) {
    console.log(this, word)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
    )
  }
}
```

## 3、组件的state 和 setState
当我们要改变组件的状态的时候，不能直接用 `this.state = xxx` 这种方式来修改，如果这样做 `React.js` 就没办法知道你修改了组件的状态，它也就没有办法更新页面。  
所以，一定要使用 `React.js` 提供的 `setState` 方法，**它接受一个对象或者函数作为参数**。  


__当你调用 setState 的时候，`React.js` 并不会马上修改 `state`__
```js
  handleClickOnLikeButton () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
  }
```

setState 的第二种使用方式，可以接受一个函数作为参数。  
__React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象：__
```js
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
```

__setState 合并__  
上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。

深层的原理并不需要过多纠结，你只需要记住的是：在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题。

## 4、配置组件的props
__默认配置 defaultProps__
```js
class LikeButton extends Component {
  // defaultProps 可定义默认参数
  static defaultProps = {
    isLiked: true
  }
  constructor(props) {
    const { isLiked } = props
    console.log('init, isLiked:' + isLiked) //'init, isLiked: true'
    super()
    this.state = { isLiked: isLiked }
  }
}
```

__props 不可变: props 一旦传入进来就不能改变__
```js
class LikeButton extends Component {
  constructor(props) {
    const { isLiked } = props
    super()
    this.state = { isLiked: isLiked }
  }
  handleLiked(props) {
    props.isLiked = false // Cannot assign to read only property 'isLiked' of object '#<Object>'
  }
  render() {
    return (
      <button onClick={this.handleLiked.bind(this)}>{this.state.isLiked ? '取消' : '点赞'}</button>
    )
  }
}
```

## 5、state vs props  
__state__ 的主要作用是用于组件保存、控制、修改自己的可变状态。`state` 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 `state` 是一个局部的、只能被组件自身控制的数据源。`state` 中状态可以通过 `this.setState` 方法进行更新，`setState` 会导致组件的重新渲染。

__props__ 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变。

`state` 和 `props` 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 `state` 中的数据可以通过 `props` 传给子组件，一个组件可以使用外部传入的 `props` 来初始化自己的 `state`。但是它们的职责其实非常明晰分明：__`state` 是让组件控制自己的状态，`props` 是让外部对组件自己进行配置__。

如果你觉得还是搞不清 `state` 和 `props` 的使用场景，那么请记住一个简单的规则：__尽量少地用 `state`，尽量多地用 `props`__。

没有 `state` 的组件叫无状态组件（`stateless component`），设置了 `state` 的叫做有状态组件（`stateful component`）。  
因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。前端应用状态管理是一个复杂的问题，我们后续会继续讨论。


## 6、前端应用状态管理
__react中，通常将多个组件之间共享的状态交给`组件最近的公共父节点`保管，然后通过 props 把状态传递给子组件，以此实现在组件之间共享数据。__

-------------------------


## 1、组件挂载的生命周期

- __构造阶段：父组件先构造，子组件按DOM顺序构造__
- __挂载阶段：子组件按DOM顺序挂载，父组件后挂载__  

以评论组件为例:
```js
  class Comment extends Component {
    render(
      <ComponentInput />
      <ComponentList />
    )
  }
  // Comment constructor
  // Comment componentWillMount
  // ComponentInput constructor
  // ComponentInput componentWillMount
  // ComponentList constructor
  // ComponentList componentWillMount
  // ComponentInput did mount
  // ComponentList did mount
  // Comment did mount
```

## 2、ref 和 dom操作

```js
  class AutoFocusInput extends Component {
    componentDidMount () {
      this.input.focus()
    }
    render () {
      return (
        <input ref={(inputDom) => this.input = inputDom} />
      )
    }
  }
  ReactDOM.render(
    <AutoFocusInput />,
    document.getElementById('root')
  )
```

-------------------------


## 1、高阶组件

__高阶组件就是一个函数，传给它一个组件，它返回一个新的组件__

高阶组件的作用:其实就是为了组件之间的代码复用。  
组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。高阶组件内部的包装组件和被包装组件之间通过 props 传递数据


## 2、Redux
__`（1）Web 应用是一个状态机，视图与状态是一一对应的。`__  
__`（2）所有的状态，保存在一个对象里面。`__

**手动实现redux，见demo中的redux-simple.html**


## 3、纯函数
（1）一个函数的返回结果只依赖于它的参数  
（2）在执行过程里面没有副作用

官方推荐编写钩子（hook），即函数是编程 
但函数式编程应当符合函数的规范，即编写__纯函数(只能进行数据运算)__，不涉及计算的操作(如生成日志，储存状态，改变应用状态等)会带来__副效应（side effect）__  
一句话，__钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应__。函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。  
