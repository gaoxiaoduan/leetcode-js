---
nav:
  title: Blog
group:
  title: 工程化
  order: 2
toc: content
---

# 前端模块化

## 一、参考资料

- [es-module-history](https://gist.github.com/jkrems/769a8cd8806f7f57903b641c74b5f08a)
- [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
- [defer 和 async 的区别](https://segmentfault.com/q/1010000000640869)
- [可能是最详细的 UMD 模块入门指南](https://juejin.cn/post/6844903927104667662)
- [在浏览器中使用 ECMAScript Modules](https://juejin.cn/post/6943233321765715976#heading-9)

## 二、发展历史

- js 的设计之初就是为了满足简单的页面设计+表单提交，并无模块化 or 命名空间的概念
- 而是实实在在的需求推进了所有技术的演进，模块化也是。
- 站在前端发展的上帝视角来看，随着前端的能力在纵深都得到增强之后，迫切的需要更好的代码管理、组织、通信的模式，各种模块化的技术方案开始出现。
- 现如今模块已经成为了代码管理/编译，业务分离的基本单元。

总的发展历史：

- 无模块化(IIFE) -> CommonJS -> AMD -> CMD -> ESModule、UMD

### 1.无模块化

需求:

1. 开始需要在页面中加载不同的 js：动画、组件、格式化
2. 多种 js 分布在不同的文件中
3. 不同的文件又被同一个模块中引用

**文件拆分是最基础的模块化**

```js
<script src='jq.js'></script>
<script src='main.js'></script>
<script src='dep1.js'></script>
// ...
```

问题：这个时期函数命名可能会冲突，影响到其他人写的代码

#### 引出的问题:

- script 标签的参数 - async & defer 的区别？

![async & defer 的区别](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202303091712520.png)

总结：
主要是对标签下载和执行时机的控制

- 普通标签 - 遇到标签就去下载，下载完毕之后立刻去解析代码并执行，这个时候会阻塞 GUI 线程渲染
- defer - 遇到标签之后异步下载，下载完成之后等待其他标签解析完成之后开始执行（**在主线程解析完成之后才执行，降低脚本的优先级，保持用户体验**，使用相对较多）
- async - 遇到标签之后异步下载，下载完成之后立即执行并阻塞渲染，执行完成之后继续渲染（**异步下载结束之后立即执行，不保证脚本执行顺序**，一般用来给那些不需要任何依赖的脚本使用）
- 拓展
- `ESM` 默认是通过 `defer` 的方式加载的，所以是不需要在 `script` 标签上加 `defer` 属性的

#### 横向拓展

1. 兼容性如何？ > IE9
2. 引导内容
   1. **浏览器渲染原理**
   2. **同步异步的原理（Promise，任务队列）**
   3. 模块化加载原理
3. 产生的问题
   1. 污染全局作用域 => 不利于大型项目的开发以及多人团队的共建

### 2.IIFE

IIFE 主要是开始对作用域的把控
利用函数的块级作用域进行隔离
可以说 IIFE 是现代模块化的基石

```js
(function ($) {
  console.log($);
  return {
    data: [],
  };
})(jQuery); //注入对象
```

### 3.Commonjs(cjs)

- 服务器端 node，浏览器端 webpack|browserfy
- 文件即模块
  - 模块加载同步
  - 服务器模块加载是运行时同步加载
  - 浏览器模块加载是提前编译打包处理
- exports = module.exports
  - 注意：不能直接给 exports 赋值，会导致与 module 断开引用
  - 使用 require 进行引入
- 缓存
  - cjs 在引用文件的时候，会将文件执行一遍，然后将结果通过浅拷贝的方式写入全局缓存中
  - 后续再次 require 同一个文件时，直接从缓存中读取，不会重新执行模块文件

```js
// a.js
var name = 'morrain';
var age = 18;
exports.name = name;
exports.getAge = function () {
  return age;
};
// b.js
var a = require('a.js');
console.log(a.name); // 'morrain'
a.name = 'rename';
var b = require('a.js');
console.log(b.name); // 'rename'
```

- 模块输出的结果是**值的拷贝**，一但输出，模块内部变化后，无法影响之前的引用，而**ESModule 是引用拷贝**

```js
// a.js
var name = 'morrain';
var age = 18;
exports.name = name;
exports.age = age;
exports.setAge = function (a) {
  age = a;
};
// b.js
var a = require('a.js');
console.log(a.age); // 18
a.setAge(19);
console.log(a.age); // 18
```

- cjs 在**运行时**加载，ESM 是**编译时**加载
- 缺点：**不支持异步**
  - cjs 更偏向于服务端，因为服务端 I/O 能力强，所以 CMJ 是同步的方法
  - ESM 时机遇编译时的，所以支持**异步**能力

### 4.AMD

AMD(Asynchronous module definition)异步的模块定义
解决了 Commonjs 不支持异步的缺点，可以在浏览器端运行

经典代表：[require.js](https://requirejs.org/)

使用方法：

```js
// define来定义模块
define(id, [depends], callback);
// require进行加载
require([module], callback);
```

示例：

```js
//提前加载执行顺序
// RequireJS
define('a', function () {
  console.log('a load');
  return {
    run: function () {
      console.log('a run');
    },
  };
});

define('b', function () {
  console.log('b load');
  return {
    run: function () {
      console.log('b run');
    },
  };
});

require(['a', 'b'], function (a, b) {
  console.log('main run'); // 🔥
  a.run();
  b.run();
});

// a load
// b load
// main run
// a run
// b run
```

缺点：

- 在代码运行时，会**先递归的找出所有的依赖**，然后将依赖放到**前面**加载
- 如果依赖过多，项目可能会变慢，引入成本升高

#### 引出的问题：

- 如果现在 AMD 中兼容 CJS 的代码怎么办？

```js
define('amdModule', [], (require) => {
  const dep1 = require('./dep1');
  const dep2 = require('./dep2');
  // 业务逻辑……
});
```

### 5.CMD

CMD(Common Module Definition-通用模块定义)推崇**依赖后置**，也就是**按需执行**
CMD 解决了 AMD**依赖前置**导致的引入成本过高的问题
整合了 CJS 和 AMD 的特点，浏览器端运行

经典代表：[Sea.js](https://seajs.github.io/seajs/docs/)

```js
// 引入require
var fs = require('fs'); //同步
require.async('./module3', function (m3) {}); //异步

// sea.js，按需引入
define('a', function (require, exports, module) {
  console.log('a load');
  exports.run = function () {
    console.log('a run');
  };
});

define('b', function (require, exports, module) {
  console.log('b load');
  exports.run = function () {
    console.log('b run');
  };
});

define('main', function (require, exports, module) {
  console.log('main run');
  var a = require('a');
  a.run();
  var b = require('b');
  b.run();
});

seajs.use('main');

// main run
// a load
// a run
// b load
// b run
```

缺点：

- 依赖打包，加载逻辑存在于每个模块中
- 扩大了模块体积，同时功能上依赖编译

### 6.UMD

UMD (Universal Module Definition)就是一种通用模块定义规范，让你的模块能在所有运行环境中使用，如`CommonJS`, `AMD`, `CMD`

```js
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    console.log('是commonjs模块规范，nodejs环境');
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    console.log('是AMD模块规范，如require.js');
    define(factory);
  } else if (typeof define === 'function' && define.cmd) {
    console.log('是CMD模块规范，如sea.js');
    define(function (require, exports, module) {
      module.exports = factory();
    });
  } else {
    console.log('没有模块环境，直接挂载在全局对象上');
    root.umdModule = factory();
  }
})(this, function () {
  return {
    name: '我是一个umd模块',
  };
});
```

### 7.ESM

ESModule 是伴随着 ES6 推出的原生模块化解决方案
import 输入、export 输出

- 支持异步加载
- 编译时加载，支持静态分析
- 更好的支持`chunk`和`tree shaking`
- 支持动态导入（按需加载）`import().then()`
- 支持`import.meta`获取模块元数据
