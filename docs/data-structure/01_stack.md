---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 1
---

# 栈(stack)

## 一、介绍

**数组**是一个**线性结构**，并且可以在数组的任意位置**插入**和**删除**元素。 但是有时候，我们为了实现某些功能，必须对这种任意性加以限制。 **栈和队列**就是比较常见的**受限的线性结构**。

特点：

- 栈是`后进先出`（last in first out）的，就是后进入的元素，先出栈。类似于自动餐托盘，最后放上的托盘，往往先拿出去使用
- 栈的最上面的元素被称为`栈顶`，栈的最内的元素，被称为`栈底`
- 向一个栈插入新元素又称作`进栈`、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素
- 从一个栈删除元素又称作`出栈`或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素

如图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201041556199.png" style="max-width:100%" />
  <div align=center>栈</div>
</div>

## 二、程序中的栈

- **函数调用栈**：A(B(C(D())))： 即 A 函数中调用 B，B 调用 C，C 调用 D；在 A 执行的过程中会将 A 压入栈，随后 B 执行时 B 也被压入栈，函数 C 和 D 执行时也会被压入栈。所以当前栈的顺序为：A->B->C->D（栈顶）；函数 D 执行完之后，会弹出栈被释放，弹出栈的顺序为 D->C->B->A;
- **递归**： 为什么没有停止条件的递归会造成栈溢出？比如函数 A 为递归函数，不断地调用自己（因为函数还没有执行完，不会把函数弹出栈），不停地把相同的函数 A 压入栈，最后造成**栈溢出（Queue OverFloat）**。

## 三、练习

题目：有 6 个元素 6，5，4，3，2，1 按顺序进栈，问下列哪一个不是合法的出栈顺序？

- A：5 4 3 6 1 2 （√）
- B：4 5 3 2 1 6 （√）
- C：3 4 6 5 2 1 （×）
- D：2 3 4 1 5 6 （√）

题目所说的按顺序进栈指的不是一次性全部进栈，而是有进有出，进栈顺序为 6 -> 5 -> 4 -> 3 -> 2 -> 1。

解析：

- A 答案：65 进栈，5 出栈，4 进栈出栈，3 进栈出栈，6 出栈，21 进栈，1 出栈，2 出栈（整体入栈顺序符合 654321）。
- B 答案：654 进栈，4 出栈，5 出栈，3 进栈出栈，2 进栈出栈，1 进栈出栈，6 出栈（整体的入栈顺序符合 654321）。
- C 答案：6543 进栈，3 出栈，4 出栈，之后应该 5 出栈而不是 6，所以错误。
- D 答案：65432 进栈，2 出栈，3 出栈，4 出栈，1 进栈出栈，5 出栈，6 出栈。符合入栈顺序。

## 四、实现栈结构

### 栈常见的操作

- `push()` 添加一个新元素到栈顶位置。
- `pop()` 移除栈顶的元素，同时返回被移除的元素。
- `peek()` 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。
- `isEmpty()` 如果栈里没有任何元素就返回 `true`，否则返回 `false`。
- `size()` 返回栈里的元素个数。这个方法和数组的 `length` 属性类似。
- `toString()` 将栈结构的内容以字符串的形式返回。

### 代码实现

```js
function Stack() {
  this.items = [];

  // 1.入栈
  Stack.prototype.push = function (element) {
    return this.items.push(element);
  };

  // 2.出栈
  Stack.prototype.pop = function () {
    return this.items.pop();
  };

  // 3.查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  };

  // 4.判断栈是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  // 5.返回栈的长度
  Stack.prototype.size = function () {
    return this.items.length;
  };

  // 6.toString方法
  Stack.prototype.toString = function () {
    // 返回格式如： 10 20 30 等
    var resString = '';
    for (var i = 0; i < this.items.length; i++) {
      resString += this.items[i] + ' ';
    }
    return resString;
  };
}
```

### 测试代码

```js
var stack = new Stack();
stack.push('10');
stack.push('20');
stack.push('30');
console.log(stack.items); // [ '10', '20', '30' ]

stack.pop();
console.log(stack.items); // [ '10', '20' ]

console.log(stack.peek()); // 20
console.log(stack.isEmpty()); // false
console.log(stack.size()); // 2
console.log(stack.toString()); // 10 20
```

## 五、应用

### 1.利用栈结构的特点封装实现十进制转换为二进制的方法

```js
// 十进制转二进制
function dec2bin(decNumber) {
  var stack = new Stack();
  while (decNumber > 0) {
    stack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }

  var binaryString = '';
  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }
  return binaryString;
}
console.log(dec2bin(100)); // 110010
```

### 2.[有效的括号](/js-logs/stack#20有效的括号)

- 解题思路：
- 使用栈结构先进后出的特性
- 先声明一个栈 stack 变量
- 遍历整个字符串
- 发现 ( 、 {、 [ 就入栈
- 发现 )、}、] 就和栈顶做比较，若栈顶存在对应的括号，将与之对应的括号出栈
- 遍历结束后，若栈空，则说明所有括号都能找到相匹配的

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  var stack = [];
  var length = s.length;
  var map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');

  for (var i = 0; i < length; i++) {
    var c = s[i];
    if (map.has(c)) {
      stack.push(c);
    } else {
      var stackTop = stack[stack.length - 1];
      if (map.get(stackTop) === c) {
        // 栈顶元素出栈
        stack.pop();
      } else {
        // 栈顶元素与当前元素不匹配 “})” "])" return
        return false;
      }
    }
  }
  return stack.length === 0 ? true : false;
};
```
