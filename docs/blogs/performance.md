---
nav:
  title: Blog
group:
  title: 其他
  order: 2
toc: content
order: 0
---

# 前端性能指标&优化

## 参考资料

- [从输入 URL 到页面展示到底发生了什么？](https://zhuanlan.zhihu.com/p/133906695)
- [Web 指标-Google](https://web.dev/vitals/)
- [关于 cdn、回源等问题一网打尽](https://juejin.cn/post/6844903604596244493)
- [前端性能优化之 rel=“prefetch“预/懒加载功能](https://blog.csdn.net/weixin_45792953/article/details/112168794)

## 前置知识

从一个经典的面试题引出文章内容：
**输入 url 到页面最终呈现都发生了什么？**

- URL 解析
  - 判断输入是搜索关键字还是 url 地址，对 url 解析
- DNS 域名解析获取 IP 地址
  - 缓存查找：浏览器缓存（chrome://net-internals/#dns）->系统缓存（host）->路由器缓存->运营商缓存（IPS）->根域名服务器
  - 向本地 DNS 服务器发送查询报文"query zh.wikipedia.org"
  - 本地 DNS 服务器检查自身缓存，存在返回，不存在向根域名服务器发送查询报文"query zh.wikipedia.org"，得到顶级域 .org 的顶级域名服务器地址
  - DNS 服务器向 .org 域的顶级域名服务器发送查询报文"query zh.wikipedia.org"，得到二级域 .wikipedia.org 的权威域名服务器地址
  - DNS 服务器向 .wikipedia.org 域的权威域名服务器发送查询报文"query zh.wikipedia.org"，得到主机 zh 的 A 记录，存入自身缓存并返回给客户端
  - 拓展方向：什么是 CDN？、CDN 回源？
- 根据 IP 地址建立 TCP 链接（三次握手）
  - 三次挥手主要是为了`双方确认过信息，可以建立起通信`，见图 1
    - 抽象一点的话，这个过程可以想象成两个人分别站在`山谷的两边`，想要`相互聊天`，但是又不确定自己喊一嗓子之后对方到底能不能听到，然后就双方开始聊天之前先互相喊几嗓子，确认一下双方是不是都可以听到
  - 第一次：主机 A 发给 B 一个标识位 SYN，希望通过该数据告诉主机 B 建立连接
    - 相当于 A 想找 B 聊天，就喊了一个 x 给 B
  - 第二次：主机 B 通过一个确认应答的 ACK 和同步序列号 SYN 响应给 A，这样主机 A 通过 ACK 就知道主机 B 接收到了第一次的握手的数据，并且主机 A 通过响应的 SYN 知道了要从那个序列号做标记
    - 相当于 B 听到了 A 喊的 x，知道 A 想聊天，`B不知道A能不能听到自己说话`，然后 B 就把 A 第一次的 x 和自己想说的话 y 一起喊给了 A
  - 第三次：主机 A 发送主机 B 响应的 SYN+1，这样主机 B 就知道主机 A 收到了自己的信息，后面就可以传输数据了
    - 然后 A 收到了第一次喊话的 x+1，这样`A就确认了B可以听到自己的话`，然后 A 再把 B 说的话 y+1 喊给 B，这样`B收到A的信息之后就知道A可以听到自己的话`，后面双方就可以愉快的聊天了
- 发送 http 请求，服务器响应，缓存判断（强缓存｜协商缓存）
  - 请求：发送命令+发送请求头信息+空白行+请求体（post）
  - 响应：响应状态 + 响应头+空白行+响应体
  - 强缓存：cache-control（max-age）、Expires
  - 协商缓存：返回 ETag、Last-modified 和请求 IF-none-match、IF-modified-since
- 浏览器解析响应内容并渲染页面，见图 2
  - 解析 HTML，生成 DOM 树
  - 解析 CSS，生成 CSSOM(CSS Object Model)
  - 合并 DOM 树和 CSSOM，生成 Render 树
  - 然后交给 Layout 引擎，根据 Render 树信息，获取节点的元素大小和位置等布局信息
  - 然后交给 Paint 引擎，绘制页面像素信息，显示在屏幕上
  - 这个过程并不是一次性完成的，而是可能存在`重复`或`交叉`的情况，比如当遇到 JavaScript 或者动态资源时，可能需要重新构建或更新某些部分。
  - 拓展方向：重排、重绘
    - 重排（reflow）：元素的几何尺寸发生变化需要重新计算元素在页面中的位置和大小，这个过程会交给 Layout 引擎，导致整颗 Render 树重新计算，开销较大
    - 重绘（repaint）：元素的外观（颜色、背景、边框）发生变化，浏览器需要重新绘制，这个过程触及到 Paint 引擎，直接绘制，执行效率比重排高
- 连接结束关闭 TCP 链接（四次挥手）
  - 抽象层面理解的话，就好比男女朋友分手
  - 第一次：男方想分手，就给女方发一个 FIN 包（表示结束），并等待女方的回答
  - 第二次：女方收到了男方的 FIN 包，就给男方回复了一个 ACK 包（表示确认），告诉他“我知道你想分手了”，但是女方还有一些话想说，不会马上同意分手（表示服务器需要时间处理关闭的逻辑）
  - 第三次：女方说完了自己的话（关闭逻辑处理结束），就给男方发一个 FIN 包（表结束），表示自己也同意分手了，并等待男方的回应
  - 第四次：男方收到了 FIN 包，就给女方回一个 ACK 包（表确认），表示自己也同意分手了，并且俩人不再有话说。这样女方听到之后俩人就正式断开了链接

三次握手与四次挥手
![图1.tcp三次握手与四次挥手](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303141548343.png)

浏览器解析响应内容并渲染页面
![图2.浏览器解析响应内容并渲染页面](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303141750038.png)

### 拓展方向

#### TCP 与 UDP 的区别？

- TCP：
  - TCP 协议则是`建立在IP协议`之上的。TCP 协议负责在两台计算机之间建立`可靠`连接，保证数据包按`顺序`到达。
  - TCP 协议会通过`三次握手`建立连接，然后，对每个 IP 包编号，确保对方按顺序收到，如果包丢掉了，就自动重发。
  - 许多常用的更高级的协议都是建立在 TCP 协议基础上的，比如用于浏览器的`HTTP`协议、发送邮件的`SMTP`协议等。
  - 一个 TCP 报文除了包含要传输的数据外，还包含源 IP 地址和目标 IP 地址，源端口和目标端口。
- UDP：
  - UDP 则是`面向无连接`的协议，TCP 必须建立可靠的连接
  - 使用 UDP 协议时，`不需要建立连接`，只需要知道对方的 IP 地址和端口号，就可以直接发数据包。但是，能不能到达就不知道了。所以 UDP 传输的数据`不可靠`
  - UDP 是`面向报文`的，没有拥塞控制，所以速度快，比较多媒体通讯，
  - 如：聊天和视频，支持一对一、一对多、多对一、多对多，如浏览器上的视频聊天
  - 但是现在常见的直播服务，为了提供`稳定`的直播环境，都是采用的 TCP 链接

#### HTTP1.0、1.1、2.0 的区别？

- 1.0
  - 每次 tcp 连接只能发送`一个`请求，当服务器响应后就会关闭这次连接，下一个请求需要`再次建立`TCP 连接
- 1.1
  - 默认采用`持续链接`（TCP 链接默认不关闭，可以被多个请求复用，不用声明 Connection:keep-alive）
  - 增加了`管道机制`，在同一个 TCP 连接里，浏览器允许多个请求同时发送，增加了并发性，进一步改善了 HTTP 协议的效率
  - 但是在同一个 TCP 连接里，所有的数据通信是按`次序`进行的。如果前面有一个请求回应慢，就会有许多请求排队，造成`“队头堵塞”`
- 2.0
  - 加了`双工模式`，即：不仅客户端能够同时发送多个请求，服务端也能同时处理多个请求，解决了队头堵塞的问题
  - 使用了`多路复用`的技术，做到`同一个连接并发处理多个请求`，而且并发请求数量比 http1.1 大了好几个数量级
  - 增加服务器推送的功能，不经请求，服务端主动向客户端发送数据

#### HTTP1.1 长连接和 2.0 多路复用的区别？

- 长连接：同一时间一个 TCP 连接只能处理一个请求，采用`一问一答`的形式，上一个请求响应后才能处理下一个请求，由于`浏览器有最大TCP连接的限制`（6 个），所以有了最大并发请求数的限制。
- 多路复用：同域名下所有的通信都在`单个TCP`连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。单个连接上可以`并行`的请求和响应，之前互不干扰

#### 为什么 HTTP1.1 不能实现多路复用？

- http2.0 是基于`二进制"帧"`的概念，http1.1 是基于`“文本分割”`解析的协议
- 在 http1.1 的报文结构中，服务器需要不断的读入字节，直到遇到`换行符（br）`，或者说是空白行。处理顺序是`串行`的，一个请求和一个响应需要通过`一问一答`的形式才能对应起来
- http2.0 中，有两个非常重要的概念，分别是`“帧”和“流”`
- 帧：代表着最小的`数据单位`，每个帧会标识出该帧属于哪个流，流也就是帧组成的数据流
- 多路复用：就是在每一个`TCP连接中可以存在多条流`。
- 换句话说，也就是可以发送多个请求，可以通过`帧中的标识`知道属于哪个请求
- 通过这个技术，可以避免 HTTP 就版本中的`队头堵塞`问题，极大的提高传输性能

#### 什么是 CDN？、CDN 回源？

- CDN 是`内容分发网络`的缩写，它是一种将互联网内容快速传输给用户的技术。CDN 通过在不同地区部署多个服务器，将内容缓存到离用户最近的服务器上，从而`减少延迟和带宽`消耗。
- CDN 回源是指当 CDN 节点没有缓存用户请求的内容时，需要向源站（原始服务器）请求资源，并`重新设置缓存`的过程。回源可以保证 CDN 节点总是能够提供最新和最完整的内容给用户，但也会增加源站的负载和流量成本。

#### JS 中的垃圾回收机制（GC）

垃圾回收是一站自动管理内存的机制，js 中的 gc 主要有两种算法：引用计数、标记清除

- 引用计数：比较早的算法
  - 记录每个对象被引用的次数，当一个对象的引用次数为零时，就可以被释放
  - 缺点：无法处理循环引用的情况
  - 当两个或多个对象相互引用时，他们的引用计数永远不会为零
    循环引用例子：

```js
var a = {};
var b = {};
a.b = b;
b.a = a;
```

- 标记清除：常用的算法，可以处理循环引用问题
  - 遍历所有的对象，标记那些`可达`的对象，然后清除那些不可达的对象
  - 这样即使发生循环引用，但是当他们都不可达了，就会被标记清除算法回收

标记清除处理循环引用的例子:

```js
var a = {};
var b = {};
a.b = b;
b.a = a;
a = null;
b = null;
```

这里，对象 a 和对象 b 互相引用，但在最后两行，它们都被赋值为 null，不再被任何变量引用。
如果使用引用计数算法，它们的引用计数仍然为 1，不会被回收。
但如果使用标记清除算法，它会从全局对象 window）作为根开始遍历所有的对象，发现 a 和 b 都不可达了（因为没有任何变量指向它们），就会把它们标记为垃圾，并在下一次 gc 时清除它们。

## 检测工具

原理：就是在合适的时机，打上合适的时间戳，或者暴露出事件。然后通过这些时间戳之间的差值，得出⼀个耗时时间。这个耗时时间就可以反映出我们⻚⾯的相关性能。工具如下：

- API[window.performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
- 性能监测对象：[PerformanceObserver.observe()](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)
- npm 包：[web-vitals](https://github.com/GoogleChrome/web-vitals)
- 开发者工具：[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

### 1.performance

Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、[Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)、 [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)和 [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API)。

- User Timing API ：⽤户⾃⼰定义在代码中通过调⽤ performance.mark（key） ⽅法定义的时间点。
- Navigation Timing API ： 资源请求的时间戳。
- Navigation Timing API ：它⾥⾯包含的是我们从请求开始，到整个⻚⾯的完全显示的各个阶段的时间点，包
  含了以下：
  ![Navigation Timing API](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303151130209.png)

|           key 值           |                                                                   value 值解释                                                                   |
| :------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
|      navigationStart       | 当前浏览器窗⼝的前⼀个⽹⻚关闭，发⽣ unload 事件时的时间戳。如果没有前⼀个⽹⻚，就等于 fetchStart（也就是输⼊ URL 开始，第⼀步就是卸载上个⻚⾯） |
|       redirectStart        |                                   第⼀次重定向开始时的时间戳，如果没有重定向，或者上次重定向不是同源的，则为 0                                   |
|        redirectEnd         |                最后⼀次重定向完成，也就是 Http 响应的最后⼀个字节返回时的时间戳，如果没有重定向，或者上次重定向不是同源的，则为 0                |
|         fetchStart         |                                        浏览器准备通过 HTTP 请求去获取⻚⾯的时间戳。在检查应⽤缓存之前发生                                        |
|     domainLookupStart      |                              域名查询开始时的时间戳。如果使⽤持久连接，或者从本地缓存获取信息的，等同于 fetchStart                               |
|      domainLookupEnd       |                              域名查询结束时的时间戳。如果使⽤持久连接，或者从本地缓存获取信息的，等同于 fetchStart                               |
|        connectStart        |                                     HTTP 请求开始向服务器发送时的时间戳，如果是持久连接，则等同于 fetchStart                                     |
|         connectEnd         |                                 浏览器与服务器之间的连接建⽴时的时间戳，连接建⽴指的是所有握⼿和认证过程全部结束                                 |
|        requestStart        |                                          浏览器向服务器发出 HTTP 请求时（或开始读取本地缓存时）的时间戳                                          |
|        responseEnd         |                   浏览器从服务器收到（或从本地缓存读取）最后⼀个字节时（如果在此之前 HTTP 连接已经关闭，则返回关闭时）的时间戳                   |
|         domLoading         |            当前⽹⻚ DOM 结构开始解析时，也就是 document.readyState 属性变为“loading”、并且相应的 readystatechange 事件触发时的时间戳             |
|       domInteractive       |                                                            当前⽹⻚ DOM 结构结束解析                                                             |
| domContentLoadedEventStart |                            当前⽹⻚ DOMContentLoaded 事件发⽣时，也就是 DOM 结构解析完毕、所有脚本开始运⾏时的时间戳                             |
|  domContentLoadedEventEnd  |                            当前⽹⻚ DOMContentLoaded 事件发⽣时，也就是 DOM 结构解析完毕、所有脚本运⾏完成时的时间戳                             |
|        domComplete         |                                      当前⽹⻚ DOM 结构⽣成时，也就是 Document.readyState 属性变为“complete”                                      |
|       loadEventStart       |                                     当前⽹⻚ load 事件的回调函数开始时的时间戳。如果该事件还没有发⽣，返回 0                                     |
|        loadEventEnd        |                                     当前⽹⻚ load 事件的回调函数结束时的时间戳。如果该事件还没有发⽣，返回 0                                     |

### 2.performanceObserver

PerformanceObserver.observe() ：指定监测的 `entryTypes` 的集合。

当 performance entry 被记录并且是指定的 `entryTypes` 之⼀的时候，性能观察者对象的回调函数会被调⽤。

```js
var observer = new PerformanceObserver(callback);

// 直接往 PerformanceObserver() 入参匿名回调函数
// 成功 new 了一个 PerformanceObserver 类的，名为 observer 的对象
var observer = new PerformanceObserver(function (list, obj) {
  var entries = list.getEntries();
  for (var i = 0; i < entries.length; i++) {
    //处理“mark”和“frame”事件
  }
});
//调用 observer 对象的 observe() 方法
observer.observe({ entryTypes: ['mark', 'frame'] });
```

### 3.web-vitals

⽬前只能统计'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' 。如果需要扩充的话，就可以使⽤上⾯的 Performance 进⾏更改

```js
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
// ...
```

### 4.Lighthouse

使用开发者工具中的`Lighthouse`Tab
或者使用 Node CLI 的方式

```js
npm install -g lighthouse
lighthouse <url>
```

## 性能指标

### 1.白屏时间 FP

输入 URL 开始，到页面开始有变化，只要有任意像素点的变化，就算是白屏时间完结

```js
function getFP() {
  new PerformanceObserver((entryList, observer) => {
    let entries = entryList.getEntries();
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].name === 'first-paint') {
        console.log('FP', entries[i].startTime);
      }
    }
  }).observe({ entryTypes: ['paint'] });
}
```

### 2.首次内容绘制时间 FCP

指的是⻚⾯上绘制了第⼀个元素的时间

FP 与 FCP 的最⼤的区别就在于：FP 指的是绘制像素，⽐如说⻚⾯的背景⾊是灰⾊的，那么在显示灰⾊背景时就记录下了 FP 指标。但是此时 DOM 内容还没开始绘制，可能需要⽂件下载、解析等过程，只有当 DOM 内容发⽣变化才会触发，⽐如说渲染出了⼀段⽂字，此时就会记录下 FCP 指标。因此说我们可以把这两个指标认为是和⽩屏时间相关的指标，所以肯定是最快越好。

```js
function getFCP() {
  new PerformanceObserver((entryList, observer) => {
    let entries = entryList.getEntries();
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].name === 'first-contentful-paint') {
        console.log('FCP', entries[i].startTime);
      }
    }
  }).observe({ entryTypes: ['paint'] });
}
```

### 3.⾸⻚时间

当 onload 事件触发的时候，也就是整个⾸⻚加载完成的时候

```js
function getFirstPage() {
  console.log(
    'FIRSTPAGE',
    performance.timing.loadEventEnd - performance.timing.fetchStart,
  );
}
```

### 4.最⼤内容绘制 LCP

⽤于记录视窗内最⼤的元素绘制的时间，该时间会随着⻚⾯渲染变化⽽变化，因为⻚⾯中的最⼤元素在渲染过程中可能会发⽣改变，另外该指标会在⽤户第⼀次交互后停⽌记录。

```js
function getLCP() {
  new PerformanceObserver((entryList, observer) => {
    let entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP', lastEntry.renderTime || lastEntry.loadTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}
```

### 5.⾸次可交互时间 TTI

FCP 指标后，首个长任务执行时间点，其后无长任务或 2 个 get 请求。

1. 从 FCP 指标后开始计算
2. 持续 5 秒内⽆⻓任务（执⾏时间超过 50 ms）且⽆两个以上正在进⾏中的 GET 请求
3. 往前回溯⾄ 5 秒前的最后⼀个⻓任务结束的时间

![TTI](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303151150707.png)

```js
function getTTI() {
  let time = performance.timing.domInteractive - performance.timing.fetchStart;
  console.log('TTI', time);
}
```

### 6.⾸次输⼊延迟 FID

- 从用户第一次与页面交互到浏览器实际能够开始处理事件的时间，在 FCP（首次内容绘制） 和 TTI （首次可交互时间）之间
- ⽤户⾸次与⻚⾯交互时响应的延迟
- eg：点击输入框后，因渲染等引起的延迟

```js
function getFID() {
  new PerformanceObserver((entryList, observer) => {
    let firstInput = entryList.getEntries()[0];
    if (firstInput) {
      const FID = firstInput.processingStart - firstInput.startTime;
      console.log('FID', FID);
    }
  }).observe({ type: 'first-input', buffered: true });
}
```

### 7.累计位移偏移 CLS

- 通过计算未在用户输入 500 毫秒内发生的布局偏移的偏移分数总和来测量内容的不稳定性
- ⻚⾯渲染过程中突然插⼊⼀张巨⼤的图⽚或者说点击了某个按钮突然动态插⼊了⼀块内容等等相当影响⽤户体验
- 这个指标就是为这种情况⽽⽣的，计算⽅式为：
- [`位移影响的⾯积 * 位移距离`](https://web.dev/cls/)
- CLS 推荐值为低于 0.1
- CLS 较差的最常见原因为：
  - 无尺寸的图像
  - 无尺寸的广告、嵌入和 iframe
  - 动态注入的内容
  - 导致不可见文本闪烁 (FOIT)/无样式文本闪烁 (FOUT) 的网络字体
  - 在更新 DOM 之前等待网络响应的操作

![CLS](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303151155600.png)

```js
function getCLS() {
  try {
    let cumulativeLayoutShiftScore = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count layout shifts without recent user input.
        if (!entry.hadRecentInput) {
          cumulativeLayoutShiftScore += entry.value;
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Force any pending records to be dispatched.
        observer.takeRecords();
        observer.disconnect();
        console.log('CLS:', cumulativeLayoutShiftScore);
      }
    });
  } catch (e) {
    // Do nothing if the browser doesn't support this API.
  }
}
```

### 8.谷歌标准

![指标](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303151203127.png)

- LCP（Largest Contentful Paint - 最大内容绘制时间）=> 加载性能
- FID（First Input Delay - 首次输入延迟）=> 交互性
- CLS（Cumulative Layout Shift - 累计位移偏移）=> 视觉稳定性

### 9.如何使用

- vue：定义公用方法类，common.js，mounted 阶段页面进行挂载，$nextTick()里对响应方法进行使用
- react：hooks useEffect()中使用`react.useEffect(() => {}, []);`
- 公司内部使用打点系统：使用 echars 绘制，使用均值统计、百分位数统计、样本分布统计输出性能

## 优化方法

### 1.[LCP](https://web.dev/optimize-lcp/)

影响因素

- 缓慢的服务器响应速度
- 阻塞渲染的 JavaScript 和 CSS
- 缓慢的资源加载速度
- 客户端渲染

提升方法

- 提⾼带宽（⽹速）
- 需要使⽤ webpack 进⾏ tree-shaking
- 使⽤路由懒加载，只有在使⽤的时候在进⾏路由加载
- 部署 CDN，缩短⽤户与节点之间的距离（⽹速）
- 建⽴缓存，提⾼下次加载速度。
- 开启 gzip 压缩。
- 不要在头部添加任何 script 标签，或使用 js 异步加载 defer。
- 对于少量⼩图标（单个尽量不要超过 10K 的），我们可以使⽤ url-loader 打包。或者使⽤将图标转化为字体库，异步进⾏加载。
- 对于⼤图标的话，需要做到在展示的时候再去加载。也就是当图⽚出现到浏览器窗⼝的时候再去加载，⽽不是⾸屏的图⽚全部加载。

### 2.[FID](https://web.dev/optimize-fid/)

影响因素

- 对于⽤户可操作时间，影响⼀个是注册的事件是否可以被执⾏（说的通俗点就是 JS 脚本是否加载完毕），以及是否存在`⻓任务`。

提升方法

- `分割长任务`
- 对⽂件进⾏`懒加载`，不要⼀次性把所有的 JS 加载出来。这就需要使⽤路由懒加载，在跳转到某个路由的时候，再去加载他的脚本资源。这样就可以保证 JS 加载速度的优化。
- 不要在响应事件⾥有过多的运算，导致卡顿。如果确有需要，应当开启`webWorker`，新起线程运算。

### 3.[CLS](https://web.dev/optimize-cls/)

影响因素

- 无尺寸的图像
- 无尺寸的广告、嵌入和 iframe
- 动态注入的内容
- 导致不可见文本闪烁 (FOIT)/无样式文本闪烁 (FOUT) 的网络字体
- 在更新 DOM 之前等待网络响应的操作

提升方法

- 设置图片的时候给宽高
- 预留后续动态插入的内容：骨架屏
- 如果经常需要变动的元素，脱离⽂档流，或者是占据位置，只是隐藏
- 文本字体等资源预加载
- 倾向于选择 transform 动画，而不是触发布局偏移的属性动画

## 实战

整体优化思路及解析：

- 从浏览器输入 url 到页面各阶段做了什么，进行性能优化
- 根据前端性能指标进行优化
- 框架特有的性能优化点：小程序分包、vue 路由按需加载等
- 优化方法：开发规范、技术架构设计、系统架构设计

### 1.浏览器加载优化

#### DNS 预解析、预链接

```html
<!-- 开启隐式预解析：默认情况，浏览器对a标签中与当前域名不在同一域的相关域名进行预获取且缓存结果，对于https失效 -->
<meta http-equiv="x-dns-prefetch-control" content="on" />
<!-- 只解析域名，不进行资源下载 -->
<link rel="dns-prefetch" href="http://www.baidu.com" />
<!-- 将会做 DNS 解析，TLS 协商和 TCP 握手 -->
<link rel="preconnect" href="//baidu.com" />

<!-- 在浏览器空闲时下载资源 -->
<link rel="prefetch" href="https://css-tricks.com/a.png" />
<!-- 浏览器会提前完成所有的资源加载，执行，渲染并保存在内存里 -->
<link rel="prerender" href="https://css-tricks.com" />
<!-- 提前下载资源，影响资源加载顺序，后置下载资源前置下载 -->
<link
  rel="preload"
  href="https://fonts.gstatic.com/s/sofia/v8/bjl.woff2"
  as="font"
  crossorigin="anonymous"
/>

<!-- ⽂件加载完成后，会执⾏此脚本，执⾏顺序⽆法保证，先加载完成的先执⾏ -->
<script src="./static/demo1.js" async></script>
<!-- 延迟执⾏脚本，解析完</html>后执⾏，执⾏顺序不变 -->
<script src="./static/defer-demo1.js" defer></script>
```

更多内容见[前端性能优化之 rel=“prefetch“预/懒加载功能](https://blog.csdn.net/weixin_45792953/article/details/112168794)

#### http 请求阶段

- 减少 http 请求合理利用时序：资源合并（雪碧图）、使用 promise.all 并发请求
- 减少资源体积：减少 cookie 信息、图片格式优化、gzip 静态资源压缩、webpack 打包压缩
- 合理利用缓存：cdn、http 缓存（强缓存和协商缓存）、本地缓存（localStorage、sessionStorage）

#### 浏览器渲染阶段：下载 css 并解析、下载 js 文件并解析会影响页面首屏渲染

- 减少重排重绘，尽量使用 css 动画，或者添加 will-change 属性
- script 脚本放在 body 元素中⻚⾯内容的后⾯，避免 JS 阻碍 html 解析，减少⽩屏时间
- css 文件尽量放在 head 中，尽快下载和解析
- 使用预解析和异步加载：prefetch、prerender、preload、async、defer
- 服务器端渲染 ssr
- 资源按需引入：路由懒加载，组件库按需引入

### 2.技术框架

- 路由懒加载
- 组件按需引入：babel 插件转换
- webpack 打包优化配置：资源压缩、资源拆分部署至 cdn（externals）
- 小程序：分包加载、setData 操作优化、限频接口调用优化等

### 3.架构优化

- cdn 预热
- nginx 缓存配置、gzip 压缩开启
- ssr 及预渲染
- 后端 bigpipe 引入：动态网页加载技术

### 4.bigpipe 框架

[bigPipe](https://github.com/bigpipe/bigpipe)是由 facebook 提出来的⼀种动态⽹⻚加载技术。
它将⽹⻚分解成称为 pagelets 的⼩块，然后分块传输到浏览器端，进⾏渲染。
它可以有效地提升⾸屏渲染时间。bigpipe 的适⽤是服务端进⾏渲染，然后将⼀块⼀块的⽂件传递给前端。
