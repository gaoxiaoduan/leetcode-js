---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 4
---

# 双向链表(DoublyLinkedList)

## 一、双向链表的介绍

既可以从头遍历到尾，也可以从**尾遍历到头**。链表相连的过程是**双向**的。实现原理是一个节点**既有向前连接的引用**，也有一个**向后连接的引用**

### 单向链表的特性

- 只能从头遍历到尾或者从尾遍历到头（一般从头到尾）
- 链表相连的过程是单向的，实现原理是上一个节点中有指向下一个节点的引用
- 单向链表有一个比较明显的缺点：可以轻松到达下一个节点，但回到前一个节点很难，在实际开发中, 经常会遇到需要回到上一个节点的情况。
- 由于双向链表的节点指向是双向的，所以双向链表可以有效的解决单向链表存在的问题

### 双向链表结构

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071346452.png" style="max-width:100%" />
  <div align=center>双向链表结构</div>
</div>

- 双向链表不仅有**head**指针指向第一个节点，而且有**tail**指针指向最后一个节点
- 每一个节点由三部分组成：**item**储存数据、**prev**指向前一个节点、**next**指向后一个节点
- 双向链表的第一个节点的 prev 指向**null**
- 双向链表的最后一个节点的 next 指向**null**

### 双向链表的缺点

- 每次在**插入或删除**某个节点时，都需要处理四个引用，而不是两个，实现起来会困难些
- 相对于单向链表，所占**内存空间更大**一些

## 二、双向链表的封装

### 常见操作

- `append(element)` 向链表尾部追加一个新元素
- `insert(position, element)` 向链表的指定位置插入一个新元素
- `getElement(position)` 获取指定位置的元素
- `indexOf(element)` 返回元素在链表中的索引。如果链表中没有该元素就返回 -1
- `update(position, element)` 修改指定位置上的元素
- `removeAt(position)` 从链表中的删除指定位置的元素
- `remove(element)` 从链表删除指定的元素
- `isEmpty()` 如果链表中不包含任何元素，返回 `true`，如果链表长度大于 0 则返回 `false`
- `size()` 返回链表包含的元素个数，与数组的 `length` 属性类似
- `toString()` 由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 `toString` 方法，让其只输出元素的值
- `forwardString()` 返回正向遍历节点字符串形式
- `backwardString()` 返回反向遍历的节点的字符串形式

### 1.逐步封装双向链表

> 双向链表的插入(insert)和删除(removeAt)方法需要考虑的情况较多，是一个难点

#### 1.1 先创建双向链表类 DoublyLinkedList

创建内部类并添加基本属性，再实现单向链表的常用方法

与单向链表相比

- 双向链表内部类中新添加`this.prev`属性，指向该节点的上一个节点
- 双向链表新添加 `this.tail` 属性，该属性指向末尾的节点

```js
function DoublyLinkedList() {
  // 内部类
  function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  // 属性
  this.head = null;
  this.tail = null;
  this.length = 0;
}
```

#### 1.2 实现 append()方法

```js
// 1.向链表尾部追加数据
DoublyLinkedList.prototype.append = function (data) {
  var newNode = new Node(data);
  // 若是第一次添加，直接将head和tail指向新节点即可
  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    // 让tail与新节点的prev建立连接
    newNode.prev = this.tail;
    // tail的next指向新节点
    this.tail.next = newNode;
    // 改变tail指针
    this.tail = newNode;
  }

  this.length += 1;
};
```

##### append()方法图解

情况 1：第一次添加 ==> 只需要让 head 和 tail 都指向新节点即可

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071423034.png" style="max-width:100%" />
</div>

情况 2：不是第一次添加，需要改变 tail 指针的引用关系

- 通过`newNode.prev = this.tail`：建立指向 1
- 通过`this.tail.next = newNode`：建立指向 2

如图:

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071423415.png" style="max-width:100%" />
</div>

- 通过`this.tail = newNode`：建立指向 3
- 要注意**指针改变的顺序**，最后修改 tail 指向，这样未修改前 tail 始终指向原链表的最后一个节点。

如图:

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071424697.png" style="max-width:100%" />
</div>

#### 1.3 实现 forwardString()、backwardString()、toString()方法

便于我们测试代码，先实现以上三个方法,这里就放在同一个代码块下了～其实 toString()方法就是 forwardString()方法

```js
// 返回正向遍历节点字符串形式
DoublyLinkedList.prototype.forwardString = function () {
  var current = this.head;
  var resultString = '';
  while (current) {
    resultString += current.data + ' ';
    current = current.next;
  }
  return resultString;
};

// 返回反向遍历的节点的字符串形式
DoublyLinkedList.prototype.backwardString = function () {
  var current = this.tail;
  var resultString = '';
  while (current) {
    resultString += current.data + ' ';
    current = current.prev;
  }
  return resultString;
};

DoublyLinkedList.prototype.toString = function () {
  return this.forwardString();
};
```

##### 测试代码

```js
// 测试代码
var dll = new DoublyLinkedList();

dll.append('10');
dll.append('20');
dll.append('30');
console.log(dll.toString()); // 10 20 30
console.log(dll.forwardString()); // 10 20 30
console.log(dll.backwardString()); // 30 20 10
```

#### 1.4 实现 insert()方法

```js
// 2.向链表中插入数据
DoublyLinkedList.prototype.insert = function (position, data) {
  // 1.边界判断
  if (position < 0 || position > this.length) return false;
  var newNode = new Node(data);

  // 2.第一次添加
  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    if (position === 0) {
      // 3.1 在头部插入
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    } else if (position === this.length) {
      // 3.2 在尾部插入
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      // 3.3 在中间插入 0 < position < this.length
      var current = this.head;
      var index = 0;
      // 找到要插入的位置
      while (index++ < position) {
        current = current.next;
      }
      // 让新节点的next 指向要插入位置的节点(current)
      newNode.next = current;
      // 让新节点的prev 指向 current的prev
      newNode.prev = current.prev;
      // 将新节点与 当前节点的 前一个节点的 next建立关系
      current.prev.next = newNode;
      // 让newNode成为current的前一个节点
      current.prev = newNode;
    }
  }
  this.length += 1;
  return true;
};
```

##### insert 方法图解

我们一起来分析，双向链表在进行插入时，都有哪些情况会出现

1. **情况 1**：当是第一次添加的时候，只需要让 head 和 tail 都指向 newNode 即可

```js
// 2.第一次添加
if (this.length === 0) {
  this.head = newNode;
  this.tail = newNode;
}
```

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071441105.png" style="max-width:100%" />
</div>

2. **当不是第一次插入的时候，又可以细分为以下几种情况**
   - 2.1 在头部插入 (position === 0)
   - 2.2 在尾部插入 (position === this.length)
   - 2.3 在中间插入 (0 < position < this.length)

2.1 **在头部插入时**

```js
if (position === 0) {
  // 3.1 在头部插入
  this.head.prev = newNode;
  newNode.next = this.head;
  this.head = newNode;
}
```

- 在 position === 0 时，我们要将 newNode 插入到如图的位置，成为新的头节点

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071445550.png" style="max-width:100%" />
</div>

- 通过`this.head.prev = newNode`,将头节点的 prev 指向新节点，建立引用 1
- 通过`newNode.next = this.head`,将新节点的 next 指向原来的头节点，建立引用 2
- 此时可以发现，newNode 已经与原来的头节点互相建立指向关系

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071447394.png" style="max-width:100%" />
</div>

- 最后通过` this.head = newNode`,将 newNode 成为新的头节点，建立引用 3

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071452591.png" style="max-width:100%" />
</div>

2.2 **在尾部插入时**

```js
if (position === this.length) {
  // 3.2 在尾部插入
  this.tail.next = newNode;
  newNode.prev = this.tail;
  this.tail = newNode;
}
```

- 在 position === this.length 时，我们要将 newNode 成为新的尾节点

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071456665.png" style="max-width:100%" />
</div>

- 通过`this.tail.next = newNode`,将原来的节点的 next 指向新节点，建立引用 1
- 通过`newNode.prev = this.tail`,将新节点的 prev，指向原来的尾节点，建立引用 2

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071459466.png" style="max-width:100%" />
</div>

- 通过`this.tail = newNode`,将 tail 指向新的尾节点，建立引用 3

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071502341.png" style="max-width:100%" />
</div>

2.3 **在中间插入时**

> 这种情况下，我们需要改变的引用关系稍微多一些

```js
// 3.3 在中间插入 0 < position < this.length
var current = this.head;
var index = 0;
// 找到要插入的位置
while (index++ < position) {
  current = current.next;
}
// 让新节点的next 指向要插入位置的节点(current)
newNode.next = current;
// 让新节点的prev 指向 current的prev
newNode.prev = current.prev;
// 将新节点与 当前节点的 前一个节点的 next建立关系
current.prev.next = newNode;
// 让newNode成为current的前一个节点
current.prev = newNode;
```

- 在 0 < position < this.length 时，我们假设在 1 的位置插入一个新的节点，如下图所示

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071506824.png" style="max-width:100%" />
</div>

- 我们先要找到要插入元素合适的位置，我们可以通过以下代码来找到插入的位置

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071510205.png" style="max-width:100%" />
</div>

- 我们找到**current 就是新的节点要插入的位置**，所以下面要做的就是让新的节点与 node1，node2**建立起引用关系**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071509203.png" style="max-width:100%" />
</div>

- 通过`newNode.next = current`, 让新节点的 next 指向要插入位置的节点(current)，建立引用 1
- 通过`newNode.prev = current.prev`,让新节点的 prev 指向 current 的 prev，建立引用 2

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071513980.png" style="max-width:100%" />
</div>

- 通过`current.prev.next = newNode`,将新节点与 当前节点的 前一个节点的 next 建立关系，建立引用 3
- 通过`current.prev = newNode`,让 newNode 成为 current 的前一个节点，建立引用 4

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071517599.png" style="max-width:100%" />
</div>

##### 测试代码

```js
dll.insert(0, '000');
dll.insert(2, '222');
dll.insert(5, '555');
console.log(dll.toString()); // 000 10 222 20 30 555
```

#### 1.5 实现 get()方法

```js
// 3.获取对应位置数据
DoublyLinkedList.prototype.get = function (position) {
  if (position < 0 || position >= this.length) return null;

  if (Math.floor(this.length / 2) > position) {
    // 从前往后遍历
    var index = 0;
    var current = this.head;
    while (index++ < position) {
      current = current.next;
    }
    return current.data;
  } else {
    // 从后往前遍历
    var index = this.length - 1;
    var current = this.tail;
    while (index-- > position) {
      current = current.prev;
    }
    return current.data;
  }
};
```

##### 测试代码

```js
console.log(dll.get(0)); // 000
console.log(dll.get(2)); // 222
console.log(dll.get(3)); // 20
console.log(dll.get(5)); // 555
```

#### 1.6 实现 indexOf()方法

```js
// 4.获取数据对应的位置
DoublyLinkedList.prototype.indexOf = function (data) {
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
console.log(dll.indexOf('000')); // 0
console.log(dll.indexOf('222')); // 2
```

#### 1.7 实现 update()方法

其实就在 get 方法找到元素的基础上，赋值新的数据

```js
// 5.更新方法
DoublyLinkedList.prototype.update = function (position, newData) {
  if (position < 0 || position >= this.length) return false;
  if (Math.floor(this.length / 2) > position) {
    // 从前往后 遍历
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next;
    }
    current.data = newData;
    return true;
  } else {
    // 从后往前 遍历
    var current = this.tail;
    var index = this.length - 1;
    while (index-- > position) {
      current = current.prev;
    }
    current.data = newData;
    return true;
  }
};
```

##### 测试代码

```js
dll.update(1, '111');
dll.update(3, '333');
dll.update(4, '444');
console.log(dll.toString()); // 000 111 222 333 444 555
```

#### 1.8 实现 removeAt()方法

```js
// 6.删除指定位置
DoublyLinkedList.prototype.removeAt = function (position) {
  if (position < 0 || position >= this.length) return null;
  var current = this.head;

  // 1.只有一个节点时
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    // 2.删除 头部节点
    if (position === 0) {
      this.head.next.prev = null;
      this.head = this.head.next;
    } else if (position === this.length - 1) {
      // 3.删除尾部节点
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      // 如果上面一种不好理解，也可以用下面这种写法
      // current = this.tail;
      // this.tail = this.tail.prev;
      // this.tail.next = null;
    } else {
      // 4.删除中间
      var index = 0;
      while (index++ < position) {
        current = current.next;
      }
      current.next.prev = current.prev;
      current.prev.next = current.next;
    }
  }

  this.length -= 1;
  return current.data;
};
```

##### removeAt()方法图解

让我们一起回顾一下 removeAt 主要实现了什么功能？

removeAt()方法：删除指定位置的元素，删除成功返回删除的元素的数据，删除失败返回 null

下面我们一起分析下，删除时会有哪些情况？

1. **情况 1**:只有一个节点时，将 head 和 tail 指针，指向 null 即可

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071549698.png" style="max-width:100%" />
</div>

2. 当链表的节点数量大于 1 时，会出现以下三种情况
   - 2.1 删除 头部节点，也就是删除位置 0 上的节点
   - 2.2 删除 尾部节点，也就是链表最后一位的节点
   - 2.3 删除 中间节点

2.1 删除 头部节点

```js
// 2.删除 头部节点
if (position === 0) {
  this.head.next.prev = null;
  this.head = this.head.next;
}
```

- 如下图所示，我们要删除的节点是 Node1

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071553249.png" style="max-width:100%" />
</div>

- 通过`this.head.next.prev = null`,让 Node1 后面的节点指向 null(图中引用 1) ，与 Node1 失去引用关系
- 通过`this.head = this.head.next`,让 head 与 Node1 后面的节点建立引用 2
- 经过上面两步的操作，Node1 将没有别的节点指向它，最终会被垃圾回收机制给**回收**掉，也就是会被删除

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071556860.png" style="max-width:100%" />
</div>

2.2 删除尾部节点

```js
if (position === this.length - 1) {
  // 3.删除尾部节点
  this.tail.prev.next = null;
  this.tail = this.tail.prev;
}
```

- 通过`this.tail.prev.next = null`,让尾元素的前一个节点，与之失去引用关系 1
- 通过`this.tail = this.tail.prev`,让尾元素的前一个节点与 tail 建立引用 2，使之成为新的尾元素
- 之前的尾元素，由于没有其他元素指向它，最终会被垃圾回收机制删除掉

<div align=center>
  <img src="t/gh/gaoxiaoduan/picGoImg@main/images/202201071602074.png)

2.3 删除中间节点" style="max-width:100%" />

</div>

```js
// 4.删除中间
var index = 0;
while (index++ < position) {
  current = current.next;
}
current.next.prev = current.prev;
current.prev.next = current.next;
```

- 先通过 while 循环找到要删除的元素，比如 position = x，那么需要删除的节点就是 Node(x+1)，如下图所示，我们要做的就是断了前后元素的引用关系

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071611875.png" style="max-width:100%" />
</div>

- 通过`current.next.prev = current.prev`,建立新的引用 1
- 通过`current.prev.next = current.next`,建立新的引用 2
- current 同样会被垃圾回收掉

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201071614897.png" style="max-width:100%" />
</div>

##### 测试代码

```js
console.log(dll.removeAt(0)); // 000
console.log(dll.removeAt(1)); // 222
console.log(dll.removeAt(3)); // 555
console.log(dll.toString()); // 111 333 444
```

#### 1.9 实现 remove()方法

```js
// 7.remove
DoublyLinkedList.prototype.remove = function (data) {
  var position = this.indexOf(data);
  return this.removeAt(position);
};
```

##### 测试代码

```js
console.log(dll.remove('111')); // 111
console.log(dll.toString()); // 333 444Ï
```

### 2.封装完的双向链表

```js
function DoublyLinkedList() {
  // 内部类
  function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  // 属性
  this.head = null;
  this.tail = null;
  this.length = 0;

  // 1.向链表尾部追加数据
  DoublyLinkedList.prototype.append = function (data) {
    var newNode = new Node(data);
    // 若是第一次添加，直接将head和tail指向新节点即可
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 让tail与新节点的prev建立连接
      newNode.prev = this.tail;
      // tail的next指向新节点
      this.tail.next = newNode;
      // 改变tail指针
      this.tail = newNode;
    }

    this.length += 1;
  };

  // 2.向链表中插入数据
  DoublyLinkedList.prototype.insert = function (position, data) {
    // 1.边界判断
    if (position < 0 || position > this.length) return false;
    var newNode = new Node(data);

    // 2.第一次添加
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (position === 0) {
        // 3.1 在头部插入
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      } else if (position === this.length) {
        // 3.2 在尾部插入
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      } else {
        // 3.3 在中间插入 0 < position < this.length
        var current = this.head;
        var index = 0;
        // 找到要插入的位置
        while (index++ < position) {
          current = current.next;
        }
        // 让新节点的next 指向要插入位置的节点(current)
        newNode.next = current;
        // 让新节点的prev 指向 current的prev
        newNode.prev = current.prev;
        // 将新节点与 当前节点的 前一个节点的 next建立关系
        current.prev.next = newNode;
        // 让newNode成为current的前一个节点
        current.prev = newNode;
      }
    }
    this.length += 1;
    return true;
  };

  // 3.获取对应位置数据
  DoublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) return null;

    if (Math.floor(this.length / 2) > position) {
      // 从前往后遍历
      var index = 0;
      var current = this.head;
      while (index++ < position) {
        current = current.next;
      }
      return current.data;
    } else {
      // 从后往前遍历
      var index = this.length - 1;
      var current = this.tail;
      while (index-- > position) {
        current = current.prev;
      }
      return current.data;
    }
  };

  // 4.获取数据对应的位置
  DoublyLinkedList.prototype.indexOf = function (data) {
    var current = this.head;
    var index = 0;
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index += 1;
    }

    return -1;
  };

  // 5.更新方法
  DoublyLinkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false;
    if (Math.floor(this.length / 2) > position) {
      // 从前往后 遍历
      var current = this.head;
      var index = 0;
      while (index++ < position) {
        current = current.next;
      }
      current.data = newData;
      return true;
    } else {
      // 从后往前 遍历
      var current = this.tail;
      var index = this.length - 1;
      while (index-- > position) {
        current = current.prev;
      }
      current.data = newData;
      return true;
    }
  };

  // 6.删除指定位置
  DoublyLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null;
    var current = this.head;

    // 1.只有一个节点时
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // 2.删除 头部节点
      if (position === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else if (position === this.length - 1) {
        // 3.删除尾部节点
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
        // 如果上面一种不好理解，也可以用下面这种写法
        // current = this.tail;
        // this.tail = this.tail.prev;
        // this.tail.next = null;
      } else {
        // 4.删除中间
        var index = 0;
        while (index++ < position) {
          current = current.next;
        }
        current.next.prev = current.prev;
        current.prev.next = current.next;
      }
    }

    this.length -= 1;
    return current.data;
  };

  // 7.remove
  DoublyLinkedList.prototype.remove = function (data) {
    var position = this.indexOf(data);
    return this.removeAt(position);
  };

  DoublyLinkedList.prototype.size = function () {
    return this.length;
  };

  DoublyLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  DoublyLinkedList.prototype.toString = function () {
    return this.forwardString();
  };

  // 返回正向遍历节点字符串形式
  DoublyLinkedList.prototype.forwardString = function () {
    var current = this.head;
    var resultString = '';
    while (current) {
      resultString += current.data + ' ';
      current = current.next;
    }
    return resultString;
  };

  // 返回反向遍历的节点的字符串形式
  DoublyLinkedList.prototype.backwardString = function () {
    var current = this.tail;
    var resultString = '';
    while (current) {
      resultString += current.data + ' ';
      current = current.prev;
    }
    return resultString;
  };
}

// 测试代码
var dll = new DoublyLinkedList();

dll.append('10');
dll.append('20');
dll.append('30');
console.log(dll.toString()); // 10 20 30
console.log(dll.forwardString()); // 10 20 30
console.log(dll.backwardString()); // 30 20 10

dll.insert(0, '000');
dll.insert(2, '222');
dll.insert(5, '555');
console.log(dll.toString()); // 000 10 222 20 30 555

console.log(dll.get(0)); // 000
console.log(dll.get(2)); // 222
console.log(dll.get(3)); // 20
console.log(dll.get(5)); // 555

console.log(dll.indexOf('000')); // 0
console.log(dll.indexOf('222')); // 2

dll.update(1, '111');
dll.update(3, '333');
dll.update(4, '444');
console.log(dll.toString()); // 000 111 222 333 444 555

console.log(dll.removeAt(0)); // 000
console.log(dll.removeAt(1)); // 222
console.log(dll.removeAt(3)); // 555
console.log(dll.toString()); // 111 333 444

console.log(dll.remove('111')); // 111
console.log(dll.toString()); // 333 444
```
