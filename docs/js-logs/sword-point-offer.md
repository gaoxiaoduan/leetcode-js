---
nav: JavaScript题解
group:
  title: TODO
  order: 3
order: 0
---

# 剑指 Offer

## [剑指 Offer 09. 用两个栈实现队列](https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/) <Badge type="success">easy</Badge>

- 思路
- 根据栈`先进后出`的特性,使用两个栈表示队列`先进先出`的特性
- 此题目跟[232.用栈实现队列](/js-logs/stack#232用栈实现队列)相似

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251429165.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
var CQueue = function () {
  this.stack1 = []; // |==
  this.stack2 = []; // |==
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length === 0) {
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
  }

  const res = this.stack2.pop();
  return res === undefined ? -1 : res;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## [剑指 Offer 30. 包含 min 函数的栈](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/) <Badge type="success">easy</Badge>

跟[115.最小栈](/js-logs/stack#115最小栈)相同

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (
    this.minStack.length === 0 ||
    x <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(x);
  } else {
    this.minStack.push(this.minStack[this.minStack.length - 1]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```

## [剑指 Offer 06. 从尾到头打印链表](https://leetcode.cn/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/) <Badge type="success">easy</Badge>

- 思路
- 利用递归栈(先进后出)的特性进行反转结果
- 也可以理解为深度优先遍历

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  let res = [];

  const help = (node) => {
    if (node === null) return;
    node.next && help(node.next);
    res.push(node.val);
  };
  help(head);
  return res;
};
```

## [剑指 Offer 24. 反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/) <Badge type="success">easy</Badge>

- 递归
- 利用递归栈
- 跟[206.反转链表](/js-logs/linked-list#206反转链表)相同

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const last = reverseList(head.next);
  // 4 --> 5 --> null 原来
  // 4 --> 5
  // 4 <-- 5
  head.next.next = head;

  // 4 -x-> 5
  // 4 <--- 5
  head.next = null;
  return last;
};
```

## [剑指 Offer 35. 复杂链表的复制](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(n)
空间复杂度 O(n)

- 思路（回溯+map）
- 因为链表里有 random，所以不能使用遍历+创建新节点的方式进行拷贝
- 我们用回溯递归的特性，在回溯返回的位置，单独对节点进行拷贝，并存储到 map 中
- 若 map 中已经存有改节点的 copy 节点，直接返回即可，减少重复拷贝

```js
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head, map = new Map()) {
  if (head === null) return null;
  if (!map.has(head)) {
    map.set(head, {
      val: head.val,
      // next: copyRandomList(head.next, map),
      // random: copyRandomList(head.random, map)
    });
    Object.assign(map.get(head), {
      next: copyRandomList(head.next, map),
      random: copyRandomList(head.random, map),
    });
  }

  return map.get(head);
};
```
