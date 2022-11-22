---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 2
---

# 队列(queue)

## 一、介绍

队列是一种特殊的线性表，生活中类似队列结构的场景：

- 排队，比如在电影院，商场，甚至是厕所排队。
- 优先排队的人，优先处理。 (买票、结账、WC)。

如图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201051704353.png" style="max-width:100%" />
  <div align=center>生活中的队列</div>
</div>

队列的限制

- `先进先出` (FIFO：First In First Out)
- 只允许在表的前端（front）进行删除操作
- 只允许在表的后端（rear）进行插入操作

如图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201051706113.png" style="max-width:100%" />
  <div align=center>队列</div>
</div>

## 二、程序中的队列

- 打印队列：计算机打印多个文件的时候，需要排队打印
- 线程队列：当开启多线程时，当新开启的线程所需的资源不足时就先放入线程队列，等待 CPU 处理

## 三、队列的实现

队列有两种实现方式，这里就基于数组方式实现了

- 基于数组实现
- 基于链表实现

### 队列常见的操作

- `enqueue(element)` 向队列尾部添加一个（或多个）新的项
- `dequeue()` 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
- `front()` 返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与 Map 类的 peek 方法非常类似）
- `isEmpty()` 如果队列中不包含任何元素，返回 true，否则返回 false
- `size()` 返回队列包含的元素个数，与数组的 length 属性类似
- `toString()` 将队列中的内容，转成字符串形式

### 代码实现

#### 1.普通队列

```js
function Queue() {
  this.items = [];

  // 1.将元素加入队列
  Queue.prototype.enqueue = function (element) {
    return this.items.push(element);
  };

  // 2.从队列中删除元素
  Queue.prototype.dequeue = function () {
    return this.items.shift();
  };

  // 3.查看前端的元素
  Queue.prototype.front = function () {
    return this.items[0];
  };

  // 4.查看队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  // 5.查看队列元素个数
  Queue.prototype.size = function () {
    return this.items.length;
  };

  // 6.toString方法
  Queue.prototype.toString = function () {
    // 返回格式如： 10 20 30 等
    var resString = '';
    for (var i = 0; i < this.items.length; i++) {
      resString += this.items[i] + ' ';
    }
    return resString;
  };
}
```

#### 测试代码

```js
var q = new Queue();
q.enqueue('10');
q.enqueue('20');
q.enqueue('30');
console.log(q.items); // [ '10', '20', '30' ]

q.dequeue();
console.log(q.items); // [ '20', '30' ]

console.log(q.front()); // 20
console.log(q.isEmpty()); // false
console.log(q.size()); // 2
console.log(q.toString()); // 20 30
```

#### 2.优先级队列

> 优先级队列，在队列的基础上，增加优先级
>
> 其实就是在元素`入队时`，`根据传入的优先级，找到合适的位置`，并插入

```js
function PriorityQueue() {
  // 内部类 也可以用对象存放
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  this.item = [];

  // 1.将元素加入队列
  PriorityQueue.prototype.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority);
    // 如果数组为空，将直接push
    if (this.item.length === 0) {
      this.item.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < this.item.length; i++) {
        // 若发现优先级比较大
        if (queueElement.priority < this.item[i].priority) {
          // 插入进去
          this.item.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }

      // 若没有执行过插入，说明优先级比较小，直接push
      if (!added) {
        this.item.push(queueElement);
      }
    }
  };

  // 2.从队列中删除元素
  PriorityQueue.prototype.dequeue = function () {
    return this.items.shift();
  };

  // 3.查看前端的元素
  PriorityQueue.prototype.front = function () {
    return this.items[0];
  };

  // 4.查看队列是否为空
  PriorityQueue.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  // 5.查看队列元素个数
  PriorityQueue.prototype.size = function () {
    return this.items.length;
  };

  // 6.toString方法
  PriorityQueue.prototype.toString = function () {
    // 返回格式如： 10 20 30 等
    var resString = '';
    for (var i = 0; i < this.items.length; i++) {
      resString += this.items[i] + ' ';
    }
    return resString;
  };
}
```

## 四、应用

### 1.击鼓传花

```js
const Queue = require('./queue');

/**
 * 击鼓传花游戏规则：
 * 几个朋友一起玩一个游戏，围成一圈，开始数数，数到某个数字的人自动淘汰
 * 最后剩下的这个人会获得胜利，请问：最后胜利者原来在哪一个位置上
 */
let names = ['小明', '小红', '小亮'];
function passGame(nameList, stopNum = 1) {
  let q = new Queue();
  for (const item of nameList) {
    q.enqueue(item);
  }

  while (q.size() > 1) {
    for (let i = 0; i < stopNum - 1; i++) {
      q.enqueue(q.dequeue());
    }
    q.dequeue();
  }
  console.log('最后剩下的人是:', q.front()); // 最后剩下的人是: 小红
  return nameList.indexOf(q.front()); //返回对应的位置
}

console.log(passGame(names, 3)); // 1
```

### 2.[最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/)

```js
var RecentCounter = function () {
  this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);
  // 将3000ms之前的数据，踢出队列
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }
  // 队列中剩下的元素个数就是最近的请求次数
  return this.queue.length;
};
```
