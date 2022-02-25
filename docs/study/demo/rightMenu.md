### 右键菜单
``` javaScript
  <div
    id="rightMenuDom"
    class="right-menu"
    :style="{
      display: rightMenuStatus,
      top: rightMenuTop,
      left: rightMenuLeft
    }"
  >
    <ul>
      <li>
        <span
          v-for="item in rightMenuList"
          :key="item.id"
          @click="item.handler"
          >{{ item.text }}
        </span>
      </li>
    </ul>
  </div>
```


在组件的mounted生命周期中添加全局点击事件的监听，目的是在点击任意位置后隐藏右键菜单。
``` javaScript
mounted() {
  // 监听全局点击事件
  document.addEventListener("click", () => {
    // 隐藏右键菜单
    this.$store.commit("updateRightMenuStatus", {
      status: "none",
      left: "0px",
      top: "0px"
    });
  });
}
```


紧接着，在组件的computed中获取Vuex中定义的数据，用于渲染右键菜单。
``` javaScript
computed: {
  // 右键菜单显隐状态
  rightMenuStatus(): string {
    return this.$store.state.rightMenu.status;
  },
  // 右键菜单距离浏览器顶部高度
  rightMenuTop(): string {
    return this.$store.state.rightMenu.top;
  },
  // 右键菜单距离浏览器左边长度
  rightMenuLeft(): string {
    return this.$store.state.rightMenu.left;
  },
  // 右键菜单列表内容
  rightMenuList(): [] {
    return this.$store.state.rightMenu.list;
  }
}
```

### 右键菜单样式
``` css
.right-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 166px;
  height: auto;
  background-color: rgb(242, 242, 242);
  border: solid 1px #C2C1C2;
  box-shadow: 0 10px 10px #C2C1C2;
  display: none;
  border-radius: 5px;

  ul {
    padding: 0;
    margin: 0;
    font-size: 15px;

    li {
      list-style: none;
      box-sizing: border-box;
      padding: 6px 0;
      border-bottom: 1px solid rgb(216, 216, 217);

      &:nth-child(1) {
        padding-top: 2px;
      }

      &:nth-last-child(1) {
        border-bottom: none;
      }

      span {
        display: block;
        height: 20px;
        line-height: 20px;
        padding-left: 16px;

        &:hover {
          background-color: #0070F5;
          cursor: pointer;
          color: #FFFFFF;
        }
      }
    }
  }
}
```

### 在vuex中定义数据
```javascript
rightMenu: {
  status: "none",
  top: "0px",
  left: "0px",
  list: []
}
```

随后在mutations中添加更新数据的方法。
```javascript
// 更新右键菜单数据
updateRightMenuStatus(state, menuObj: rightMenuAttribute) {
  state.rightMenu.status = menuObj.status;
  state.rightMenu.top = menuObj.top;
  state.rightMenu.left = menuObj.left;
  state.rightMenu.list = menuObj.list;
}
```

### 拦截右键事件处理指令参数
上面我们注册了一个全局指令，我们需要在它的函数内部为指令所绑定的元素重写其点击事件，处理指令传过来的参数。
- 将事件对象放进一个数组中
- 将每一个右键菜单的文本数据和与之对应的时间处理函数放进json数组中
- 获取鼠标点击的位置，使用commit更新Vuex中的相关数据，渲染页面

``` javascript
el.oncontextmenu = function(e: MouseEvent) {
  const textArray = binding.value.text;
  const handlerObj = binding.value.handler;
  // 事件处理数组
  const handlerArray = [];
  // 处理好的右键菜单
  const menuList = [];
  // 将事件处理函数放入数组中
  for (const key in handlerObj) {
    handlerArray.push(handlerObj[key]);
  }
  // 追加右键菜单数据
  for (let i = 0; i < textArray.length; i++) {
    // 右键菜单对象, 添加名称
    const menuObj = {
      text: textArray[i],
      handler: handlerArray[i],
      id: i + 1
    };
    menuList.push(menuObj);
  }
  // 鼠标点的坐标
  const oX = e.clientX;
  const oY = e.clientY;
  // 右键菜单出现后的位置
  store.commit("updateRightMenuStatus", {
    status: "block",
    left: oX + "px",
    top: oY + "px",
    list: menuList
  });
  return false;
}
```

### 在组件中使用指令
``` javascript
<li
  class="row-panel"
  v-right-click="rightMenuObj"
>
</li>
```

``` javascript
// 右键菜单对象，菜单内容和处理事件
rightMenuObj: {
  text: [
    "查看资料",
    "复制用户id",
    "移除该会话",
    "在联系人中查看",
    "在单聊窗口中打开",
    "会话置顶"
  ],
  handler: {
    checkingData() {
      console.log("查看资料点击事件");
    },
    copyId() {
      console.log("复制用户id点击事件");
    },
    removeItem() {
      console.log("移除会话点击事件");
    },
    showContact() {
      console.log("在联系人中查看");
    },
    showSingleChat() {
      console.log("在单聊窗口中打开");
    },
    topConversation() {
      console.log("会话置顶");
    }
  }
}
```