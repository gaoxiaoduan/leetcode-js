---
nav: JavaScript题解
group: 基础数据结构
order: 4
---

# [栈](https://leetcode.cn/tag/stack/problemset/)

栈（Stack）又名堆栈，它是一种重要的数据结构。

从数据结构角度看，栈也是线性表，其特殊性在于栈的基本操作是线性表操作的子集，它是操作受限的线性表，因此，可称为限定性的数据结构。限定它仅在表尾进行插入或删除操作。表尾称为栈顶，相应地，表头称为栈底。

## [20.有效的括号](https://leetcode.cn/problems/valid-parentheses/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路：
- 使用栈结构先进后出的特性
- 先声明一个栈 stack 变量
- 遍历整个字符串
- 发现 ( 、 {、 \[ 就入栈
- 发现 )、}、] 就和栈顶做比较，若栈顶存在对应的括号，将与之对应的括号出栈
- 遍历结束后，若栈空，则说明所有括号都能找到相匹配的

优化空间

- 若字符串的长度为奇数、则括号不可能完全出栈、直接 return 即可

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s === 0) return false;
  if (s.length % 2 === 1) return false;

  let stack = [];
  let leftStr = '{[(';

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    // if (leftStr.indexOf(c) !== -1) {
    if (leftStr.includes(c)) {
      stack.push(c);
    } else {
      const top = stack[stack.length - 1];
      if (isMath(top, c)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const isMath = (left, right) => {
  if (left === '{' && right === '}') return true;
  if (left === '[' && right === ']') return true;
  if (left === '(' && right === ')') return true;
  return false;
};
```

## [232.用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/) <Badge type="success">easy</Badge>

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251429165.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
var MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  this.peek(); // 先peek，保证stack2不为空
  return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  // 当stack2为空时
  if (this.stack2.length === 0) {
    // 将stack1清空
    while (this.stack1.length) {
      const item = this.stack1.pop(); // stack1栈顶
      this.stack2.push(item); // 将stack1栈顶 入栈
    }
  }
  // 返回stack2的栈顶元素
  return this.stack2[this.stack2.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack1.length === 0 && this.stack2.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

## [678.有效的括号字符串](https://leetcode.cn/problems/valid-parenthesis-string/) <Badge type="warning">medium</Badge>

思路：

- 使用两个栈，left 存放"(" 的位置，start 存放"\*"的位置
- 遍历字符串，遇到（、\*时，记录位置
- 遍历过程中遇到 ）时，优先删除 left 中的（，当 left 为空时，删除 start 中的\*，若 start 也为空，说明不匹配，直接返回 false
- 当 ")" 遍历结束，会出现两种情况
- 1. left 中的数量比 start 多，说明不平衡，无法正确匹配，返回 false
- 2. left 中 "(" 的位置，在 start 的右边，即 "\*("这种情况，也无法正确匹配，返回 false
- 3. 判断完上面两种情况，剩下的情况也就是可以正确匹配的，即 start 中的数量比 left 多，start 中的\*都在 left 的右边，\*就可以匹配完所有的(,也就是有效的

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let left = [],
    start = [];

  for (let i = 0; i < s.length; i++) {
    const n = s[i];
    if (n === '(') {
      left.push(i);
    } else if (n === '*') {
      start.push(i);
    } else {
      if (left.length === 0) {
        if (start.length === 0) return false;
        start.pop();
      } else {
        left.pop();
      }
    }
  }

  if (left.length > start.length) return false;
  while (left.length && start.length) {
    if (left.pop() > start.pop()) return false;
  }
  return true;
};
```
