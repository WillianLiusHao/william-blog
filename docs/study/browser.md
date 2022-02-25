# 浏览器相关
## 1、缓存

> - 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识  
>
> - 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中
>
>   ![请求](https://user-gold-cdn.xitu.io/2018/4/19/162db6359673e7d0?imageslim)

**(1) 强缓存**
  - **Cache-Control**
    - public：所有内容都将被缓存（客户端和代理服务器都可缓存）
    - private：所有内容只有客户端可以缓存，Cache-Control的默认取值
    - no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
    - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
    - max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效
  - **Expires**

优先级：Cache-Control > Expires




**(2) 协商缓存**
  - **Last-Modified / If-Modified-Since**
  - **ETag / If-None-Match**

`Last-Modified:` 文件在服务器最后被修改的时间
`If-Modified-Since:` 客户端再次发起该请求时，携带上次请求返回的Last-Modified值
`Etag:` 服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)
`If-None-Match:` 客户端再次发起该请求时，携带上次请求返回的唯一标识Etag值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值

优先级：ETag > Last-Modified




**(3) 缓存位置**
  - from memory cache (内存中的缓存)
  - from disk cache (硬盘中的缓存)

浏览器读取缓存顺序：memory -> disk

内存缓存(js、img)： 快速读取和时效性
硬盘缓存(css)： 读取复杂,速度较慢

---------------------
## 2、本地存储
- Cookie
- WebStorage
  - localStorage
  - sessionStorage
- IndexedDB

----------------------
## 3、输入URL到页面呈现发生了什么？
**网络篇**  
- 网络请求  
- 网络响应  
![流程图](https://user-gold-cdn.xitu.io/2019/12/15/16f080b095268038?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)  

**解析算法篇**  
- 构建DOM树
- 样式计算
- 生成布局树
![流程](https://user-gold-cdn.xitu.io/2019/12/15/16f080b2f718e4ad?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**渲染过程篇**  
- 建图层树
- 生成绘制列表
- 生成图块和生成位图
- 显示器显示内容
![流程](https://user-gold-cdn.xitu.io/2019/12/15/16f080b7b8926b7f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## XSS攻击
- 存储型
- 反射型
- 文档型

`防范措施`

## CSRF攻击