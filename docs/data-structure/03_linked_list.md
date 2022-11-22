---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 3
---

# 链表(LinkedList)

## 一、介绍

链表和数组一样，可以用于**存储一系列的元素**，但是链表和数组的实现**机制完全不同**。链表又可以分作**单向链表**和**双向链表**。

链表的每个元素由一个存储**元素本身的节点**和一个**指向下一个元素的引用**（有的语言称为指针或连接）组成。类似于火车头，一节车厢载着乘客（数据），通过节点连接另一节车厢。如下图所示

- 链表的火车结构

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201061345018.png" style="max-width:100%" />
  <div align=center>火车结构</div>
</div>

- 链表的数据结构

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201061347606.png" style="max-width:100%" />
  <div align=center>链表的数据结构</div>
</div>

​ head 属性指向链表的第一个节点。

​ 链表中的最后一个节点指向 `null`。

​ 当链表中一个节点也没有的时候，head 直接指向 `null`。

- 给火车加上数据结构后

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201061345371.png" style="max-width:100%" />
  <div align=center>给火车加上数据结构后</div>
</div>

### 数组的优缺点

- 优点：
  - 一般存储多个元素时，数组（或列表）可能是最常用的数据结构
- 缺点：
  - 数组的创建需要申请一段连续的内存空间(一整块内存)，并且大小是固定的，**当前数组不能满足容量需求时，需要扩容**。 (一般情况下是申请一个更大的数组，比如 2 倍，然后将原数组中的元素复制过去)
  - 在数组**开头**或中间位置**插入数据的成本很高**，需要进行**大量元素的位移**

​

### 链表的优缺点

- 优点：
  - 链表中的元素在内存中**不必是连续的空间**，可以充分利用计算机的内存，实现灵活的**内存动态管理**。
  - 链表不必在创建时就**确定大小**，并且大小可以**无限地延伸**下去。
  - 链表在**插入和删除**数据时，**时间复杂度**可以达到 O(1)，相对数组效率高很多。
- 缺点：
  - 链表访问任何一个位置的元素时，都需要**从头开始访问**（无法跳过第一个元素访问任何一个元素）
  - 无法通过下标值直接访问元素，需要从头开始一个个访问，直到找到对应的元素
  - 虽然可以轻松地到达**下一个节点**，但是回到**前一个节点**是很难的
  - 总的来说就是**链表查找效率低**

## 二、链表的实现

### 链表中的常见操作

- `append(element)` 向链表尾部添加一个新的项。
- `insert(position, element)` 向链表的特定位置插入一个新的项。
- `get(position)` 获取对应位置的元素。
- `indexOf(element)` 返回元素在链表中的索引。如果链表中没有该元素就返回-1。
- `update(position, element)` 修改某个位置的元素。
- `removeAt(position)` 从链表的特定位置移除一项。
- `remove(element)` 从链表中移除一项。
- `isEmpty()` 如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false。
- `size()` 返回链表包含的元素个数，与数组的 length 属性类似。
- `toString()` 由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。

### 1.逐步封装单向链表

#### 1.1 先创建单向链表类 LinkedList，并添加基本属性，再实现单向链表的常用方法：

```js
function LinkedList() {
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  this.head = null;
  this.length = 0;
}
```

#### 1.2 实现 append() 方法

```js
// 1.向链表尾部追加数据
LinkedList.prototype.append = function (data) {
  var newNode = new Node(data);
  // 若链表为空
  if (this.length === 0) {
    // 将head指向第一个节点
    this.head = newNode;
  } else {
    var current = this.head;
    // 当current.next为null 的时候会退出循环
    while (current.next) {
      // 指针后移
      current = current.next;
    }
    // 当指到最后一个node时，给next append newNode
    current.next = newNode;
  }
  // 注意：append后长度要+1
  this.length += 1;
};
```

##### append 过程详解

1. 首先让 `currentNode` 指向第一个节点。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201061403803.png" style="max-width:100%" />
</div>

2. 通过 `while` 循环使 `currentNode` 指向最后一个节点，最后通过 `currentNode.next = newNode`，让最后一个节点指向新节点 `newNode`。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201061403206.png" style="max-width:100%" />
</div>

#### 1.3 实现 toString() 方法

```js
// 2.方便测试，先完成toString方法
LinkedList.prototype.toString = function () {
  var current = this.head;
  var resultString = '';
  while (current) {
    resultString += current.data + ' ';
    current = current.next;
  }
  return resultString;
};
```

##### 测试代码

```js
var linked = new LinkedList();
linked.append('10');
linked.append('20');
linked.append('30');
console.log(linked.toString()); // 10 20 30
```

#### 1.4 实现 insert()方法

```js
// 3.插入
LinkedList.prototype.insert = function (position, data) {
  // 1.对position进行边界情况判断
  if (position < 0 || position > this.length) return false;

  var newNode = new Node(data);
  // 2.当在第一个位置插入的时候
  if (position === 0) {
    // 将要新节点的next与原链表相连
    newNode.next = this.head;
    // 改变head的指向到新的节点，有点移花接木的意思了哈～
    this.head = newNode;
  } else {
    // 3.这里要找到合适的插入位置
    var index = 0;
    var current = this.head;
    var previous = null;

    // 3.1 遍历的找到要插入的节点位置
    while (index++ < position) {
      previous = current; // 保存前一个节点
      current = current.next; // 保持当前节点
    }

    // 3.2 同样是移花接木
    newNode.next = current;
    previous.next = newNode;
  }

  this.length += 1;
  return true;
};
```

##### 测试代码

```js
linked.insert(0, '00');
linked.insert(2, '22');
linked.insert(5, '55');
console.log(linked.toString()); // 00 10 22 20 30 55
```

#### 1.5 实现 get()方法

> 根据位置获取 对应位置的数据

```js
// 4.获取对应位置的数据
LinkedList.prototype.get = function (position) {
  if (position < 0 || position >= this.length) return false;
  var current = this.head;
  var index = 0;
  while (index++ < position) {
    current = current.next;
  }
  return current.data;
};
```

##### 测试代码

```js
console.log(linked.get(0)); // 00
console.log(linked.get(2)); // 22
console.log(linked.get(5)); // 55
```

#### 1.6 实现 indexOf()方法

```js
// 5.返回数据当前位置,若找不到传入数据的位置，返回-1
LinkedList.prototype.indexOf = function (data) {
  var current = this.head;
  var index = 0;
  while (current) {
    if (current.data === data) return index;
    current = current.next;
    index += 1;
  }
  return -1;
};
```

##### 测试代码

```js
console.log(linked.indexOf('00')); // 0
console.log(linked.indexOf('22')); // 2
console.log(linked.indexOf('123123')); // -1
```

#### 1.7 实现 update()方法

```js
// 6.更新对应位置对数据
LinkedList.prototype.update = function (position, newData) {
  if (position < 0 || position >= this.length) return false;
  var current = this.head;
  var index = 0;
  while (index++ < position) {
    current = current.next;
  }
  current.data = newData;
  return true;
};
```

##### 测试代码

```js
linked.update(0, '000');
console.log(linked.get(0)); // 000
```

#### 1.8 实现 removeAt()方法

```js
// 7.根据位置删除数据
LinkedList.prototype.removeAt = function (position) {
  if (position < 0 || position >= this.length) return null;
  var current = this.head;

  if (position === 0) {
    this.head = this.head.next;
  } else {
    var previous = null;
    var index = 0;
    while (index++ < position) {
      previous = current;
      current = current.next;
    }
    // 将前一个节点的next执行下一个节点
    previous.next = current.next;
  }
  this.length -= 1;
  return current.data; // 返回删除的数据
};
```

##### 测试代码

```js
console.log(linked.removeAt(0)); // 000
console.log(linked.removeAt(4)); // 55
console.log(linked.toString()); // 10 22 20 30
```

#### 1.9 实现 remove()方法

```js
// 8.删除数据
LinkedList.prototype.remove = function (data) {
  var position = this.indexOf(data);
  return this.removeAt(position);
};
```

##### 测试代码

```js
console.log(linked.remove('10')); // 10
console.log(linked.toString()); // 22 20 30
```

### 2.封装完的单向链表

> 包括测试代码和 isEmpty()、size()的实现

```js
function LinkedList() {
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  this.head = null;
  this.length = 0;

  // 1.向链表尾部追加数据
  LinkedList.prototype.append = function (data) {
    var newNode = new Node(data);
    // 若链表为空
    if (this.length === 0) {
      // 将head指向第一个节点
      this.head = newNode;
    } else {
      var current = this.head;
      // 当current.next为null 的时候会退出循环
      while (current.next) {
        // 指针后移
        current = current.next;
      }
      // 当指到最后一个node时，给next append newNode
      current.next = newNode;
    }
    // 注意：append后长度要+1
    this.length += 1;
  };

  // 3.插入
  LinkedList.prototype.insert = function (position, data) {
    // 1.对position进行边界情况判断
    if (position < 0 || position > this.length) return false;

    var newNode = new Node(data);
    // 2.当在第一个位置插入的时候
    if (position === 0) {
      // 将要新节点的next与原链表相连
      newNode.next = this.head;
      // 改变head的指向到新的节点，有点移花接木的意思了哈～
      this.head = newNode;
    } else {
      // 3.这里要找到合适的插入位置
      var index = 0;
      var current = this.head;
      var previous = null;

      // 3.1 遍历的找到要插入的节点位置
      while (index++ < position) {
        previous = current; // 保存前一个节点
        current = current.next; // 保持当前节点
      }

      // 3.2 同样是移花接木
      newNode.next = current;
      previous.next = newNode;
    }

    this.length += 1;
    return true;
  };

  // 4.获取对应位置的数据
  LinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return false;
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  };

  // 5.返回数据当前位置
  LinkedList.prototype.indexOf = function (data) {
    var current = this.head;
    var index = 0;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index += 1;
    }
    return -1;
  };

  // 6.更新对应位置对数据
  LinkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false;
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data = newData;
    return true;
  };

  // 7.根据位置删除数据
  LinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null;
    var current = this.head;

    if (position === 0) {
      this.head = this.head.next;
    } else {
      var previous = null;
      var index = 0;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      // 将前一个节点的next执行下一个节点
      previous.next = current.next;
    }
    this.length -= 1;
    return current.data; // 返回删除的数据
  };

  // 8.删除数据
  LinkedList.prototype.remove = function (data) {
    var position = this.indexOf(data);
    return this.removeAt(position);
  };

  LinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  LinkedList.prototype.size = function () {
    return this.length;
  };

  // 2.方便测试，先完成toString方法
  LinkedList.prototype.toString = function () {
    var current = this.head;
    var resultString = '';
    while (current) {
      resultString += current.data + ' ';
      current = current.next;
    }
    return resultString;
  };
}

// 测试代码
var linked = new LinkedList();
linked.append('10');
linked.append('20');
linked.append('30');
console.log(linked.toString()); // 10 20 30

linked.insert(0, '00');
linked.insert(2, '22');
linked.insert(5, '55');
console.log(linked.toString()); // 00 10 22 20 30 55
console.log(linked.get(0)); // 00
console.log(linked.get(2)); // 22
console.log(linked.get(5)); // 55

console.log(linked.indexOf('00')); // 0
console.log(linked.indexOf('22')); // 2
console.log(linked.indexOf('123123')); // -1

linked.update(0, '000');
console.log(linked.get(0)); // 000

console.log(linked.removeAt(0)); // 000
console.log(linked.removeAt(4)); // 55
console.log(linked.toString()); // 10 22 20 30

console.log(linked.remove('10')); // 10
console.log(linked.toString()); // 22 20 30
```

## 三、应用

### 1.[删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

- 思路
- 若无任何限制，是一个普通链表，可以用正常方法删除（将上一个节点的 next，指向下一个节点即可）
- 因为题目限制无法访问链表的头节点
- 所以需要绕一个弯，将当前节点，指向下一个节点，这个时候当前节点跟下一个节点是同一个节点
- 然后将下一个节点删除即可，也就是将下个节点的指向下下个节点

```js
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

### 2.[删除排序链表中的重复元素](/js-logs/array#83删除排序链表中的重复元素)

- 思路
- 因为题目给出的链表是排好序的
- 所以只需要，遍历链表，判断当前节点与下个节点的值是否相等
- 遇到相等的情况继续删除，当 遇到 不相等的情况再进行赋值往下走

注意点：
因为第一次判断的时候用到了 p.next.val,若 p.next 为 null，则会报错，所以 while 中需要考虑 p.next 不为空的情况

```js
var deleteDuplicates = function (head) {
  var p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};
```

### 3.[反转链表](/js-logs/linked-list#反转链表)

- 思路
- 链表太长不容易看出如何反转，所以可以看作两个最短链表反转
- 短链表反转，只需要将 当前节点的 next 指回 给 上一个节点
- 所以使用 p1 为头节点，p2 为后节点，双指针一直指回，然后让双指针共同前进即可
- 因为 p1 最后会指向一个 null，p2 会指向 5
- 所以最后返回 p2 链表

```js
var reverseList = function (head) {
  var p1 = head;
  var p2 = null;
  while (p1) {
    var temp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = temp;
  }

  return p2;
};
```

### 4. [环形链表](/js-logs/linked-list#141环形链表)

- 思路
- 声明快慢两个指针进行赛跑
- 如果有环，快慢指针肯定会重逢
- 如果没有环，则不会重逢

```js
var hasCycle = function (head) {
  var p1 = head;
  var p2 = head;

  while (p1 && p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;

    if (p1 === p2) {
      return true;
    }
  }

  return false;
};
```
