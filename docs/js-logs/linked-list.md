---
nav: 刷题记录-js
group: 基础数据结构
order: 1
---

# [链表](https://leetcode.cn/tag/linked-list/problemset/)

链表（Linked List）是最简单的线性的、动态数据结构。理解它是理解树结构、图结构的基础。

区别于数组，链表中的元素不是存储在内存中连续的一片区域，链表中的数据存储在每一个称之为「结点」复合区域里，在每一个结点除了存储数据以外，还保存了到下一个节点的指针（Pointer）。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211201342939.png" style="max-width:100%" />
  <div align=center>Linked List</div>
</div>
由于不必按顺序存储，链表在插入数据的时候可以达到 O(1) 的复杂度，但是查找一个节点或者访问特定编号的节点则需要 O(n) 的时间。

## 链表双指针

### [剑指 Offer 22. 链表中倒数第 k 个节点](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 最初想到的是先遍历整个链表，得出链表长度 n
- 然后从头开始再遍历一次，第 n-k 的位置就是倒数 k 的节点
- 但是这样需要遍历两次链表
- 其实遍历一次也可以找出来
- 先声明一个指针 p1，先让 p1 向前走 k 步
- 然后再声明一个 p2，指向 head，再让两个指针同时向前走，当 p1 走到尽头，p2 指的那个就是倒数第 k 个节点

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    // 先让p1走k步
    p1 = p1.next;
  }
  // 此时声明p2指向头节点，p1,p2之间相差k距离
  let p2 = head;
  // p1,p2共同前进,当p1走到尾节点时，p2正好指向倒数第k个节点
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2;
};
```

### [19.删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 需要先找到倒数第 n 节点的前一个节点（n+1）,然后将第个 n 节点删除即可

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode();
  dummy.next = head;
  // 要删除倒数n个节点，要先获取前一个节点，也就是(n+1)
  let x = getKthFromEnd(dummy, n + 1);
  x.next = x.next.next;
  return dummy.next;
};

// 剑指 Offer 22. 链表中倒数第k个节点
// https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
// 获取链表的倒数第k个节点
var getKthFromEnd = (head, k) => {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    p1 = p1.next;
  }
  let p2 = head;
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2;
};
```

### [21.合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) <Badge type="success">easy</Badge>

时间复杂度 O(M+N)
空间复杂度 O(1)

- 思路(双指针)
- 两个链表值比较，取较小的值加入链表
- 重复第一步，然后将另一个剩下的链表直接指向要返回的链表即可

```js
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // 虚拟头节点
  let dummy = new ListNode(),
    p = dummy;
  let p1 = list1,
    p2 = list2;
  while (p1 && p2) {
    if (p1.val > p2.val) {
      // 将较小的p2节点，放入dummy中
      p.next = p2;
      p2 = p2.next;
    } else {
      p.next = p1;
      p1 = p1.next;
    }
    // 指针p偏移
    p = p.next;
  }
  // 将剩下的节点，直接接到新链表到后面
  if (p1 !== null) {
    p.next = p1;
  }
  if (p2 !== null) {
    p.next = p2;
  }
  // 返回真实的节点
  return dummy.next;
};
```

### [23.合并 k 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/) <Badge type="error">hard</Badge>

时间复杂度 O(2N + log N)
空间复杂度 O(N)

- 思路
- 跟[21 题](#21合并两个有序链表)类似，难点在于如何找出每个链表的最小值
- 这里可以先取出链表中的所有值，放入数组中，然后对数字进行排序
- 然后根据排序好的数组组成一个新的链表即可
- 拓展：也可以使用最小堆找出链表里的最小值

```js
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let arr = new Array();
  for (let item of lists) {
    let p = item;
    while (p !== null) {
      arr.push(p.val);
      p = p.next;
    }
  }
  let res = new ListNode(0);
  let p = res;
  arr
    .sort((a, b) => a - b)
    .forEach((val) => {
      p.next = new ListNode(val);
      p = p.next;
    });
  return res.next;
};
```

### [86.分隔链表](https://leetcode.cn/problems/partition-list/) <Badge type="warning">medium</Badge>

时间复杂度 O(1)
空间复杂度 O(N)

- 思路
- 使用指针 p 遍历链表
- 使用两个新链表分别保存小于 x 的节点，和大于 x 的节点
- 最后将两个链表合并返回即可
- 注意：虚拟头节点的链接使用

```js
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let dummy1 = new ListNode(),
    dummy2 = new ListNode();
  let p1 = dummy1,
    p2 = dummy2;
  let p = head;
  while (p !== null) {
    if (p.val >= x) {
      p2.next = new ListNode(p.val);
      p2 = p2.next;
    } else {
      p1.next = new ListNode(p.val);
      p1 = p1.next;
    }
    p = p.next;
  }
  p1.next = dummy2.next;
  return dummy1.next;
};
```

### [141.环形链表](https://leetcode.cn/problems/linked-list-cycle/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 声明快慢两个指针进行赛跑
- 如果有环，快慢指针肯定会重逢
- 如果没有环，则不会重逢

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let p1 = head,
    p2 = head;
  while (p1 && p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    if (p1 === p2) return true;
  }
  return false;
};
```

### [142.环形链表-ii](https://leetcode.cn/problems/linked-list-cycle-ii/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 使用快慢指针找到相遇点
- 然后将其中一个指针重置
- 再将两个指针共同向前走，再次相遇的地方就是这个环的头

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let p1 = head,
    p2 = head;
  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    // 若p1===p2结束循环
    // 此时有两种情况
    // 1.p1,p2是相同节点，说明有环
    // 2.p1,p2都是null，说明没环
    if (p1 === p2) break;
  }
  if (p2 === null || p2.next === null) return null;
  p1 = head;
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};
```

### [160.相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 难点在于，如何让指针【同时】指向相交的点
- 指针 p1 指向 headA，p2 指向 headB，
- 当 p1 遍历结束，让 p1 去遍历 headB，p2 也如此
- 这样相当于把 headA 和 headB 拼接起来，当两个指针的值相等，说明找到了相同的起点

```js
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    if (p1 === null) p1 = headB;
    else p1 = p1.next;
    if (p2 === null) p2 = headA;
    else p2 = p2.next;
  }
  return p1;
};
```

### [876.链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/) <Badge type="success">easy</Badge>

时间复杂度 O(N/2)
空间复杂度 O(1)

- 思路(快慢指针)
- 使用快慢指针
- 慢指针走一步，快指针走两步
- 这样当快指针走到头，慢指针刚好走一半
- 这里让慢指针先走，如果链表长度是偶数，慢指针刚好指向第二个数

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let fast = head,
    slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

### [977.有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/) <Badge type="success">easy</Badge>

- 思路
- 根据负数的平方是一个正数，且负数越小平方约大的特性
- 若 0 的位置为分界点，那么负数平方后的顺序是 大->小->0
- 正数的顺序是 0->小->大
- 所以可以从两端分别设置两个指针，对比大小，将大的结果放到数组，指针移动
- 相当于合并链表

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  const n = nums.length;
  let l = 0,
    r = n - 1;

  const res = new Array(n);
  let p = n - 1;
  while (l <= r) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      res[p] = nums[l] * nums[l];
      l++;
    } else {
      res[p] = nums[r] * nums[r];
      r--;
    }
    p--;
  }

  return res;
};
```

## 反转链表

### [25.k-个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/) <Badge type="error">hard</Badge>

时间复杂度 O(N)
空间复杂度 O(logN)

- 思路
- 先知道如何反转单个链表，然后在这个函数上拓展出[a,b)区间的反转函数
- 然后再分段去递归反转这个链表，若 a，b 的范围不足 k，则不需要反转
- 将反转后的链表链接出来

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) return null;
  let a = head,
    b = head;
  for (let i = 0; i < k; i++) {
    // base case
    if (b === null) return head;
    b = b.next;
  }
  let newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};

// 以链表head到b的链表,翻转的是[head,b)区间，返回新的head
var reverse = function (head, b) {
  let pre = null,
    cur = head,
    next = head;
  while (cur !== b) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  // 返回反转后的头节点
  return pre;
};
```

### [206.反转链表](https://leetcode.cn/problems/reverse-linked-list/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路（迭代解法）
- 链表太长不容易看出如何反转，所以可以看作两个最短链表反转
- 短链表反转，只需要将 当前节点的 next 指回 给 上一个节点
- 所以使用 p1 为头节点，p2 为后节点，双指针一直指回，然后让双指针共同前进即可
- 因为 p1 最后会指向一个 null，p2 会指向 5
- 所以最后返回 p2 链表

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let p1 = head;
  let p2 = null;
  while (p1 !== null) {
    let temp = p1.next;
    p1.next = p2; // 反转
    p2 = p1;
    p1 = temp;
  }
  return p2;
};

/**
 * 递归解法
 * @param {*} head
 * @returns
 */
// 函数定义:返回链表反转后的头节点
var reverseList2 = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let last = reverseList2(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
```

### [剑指 Offer 24. 反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/) <Badge type="success">easy</Badge>

本题[206 题](#206反转链表) 相同

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
```

### [92.反转链表-ii](<[http:xx](https://leetcode.cn/problems/reverse-linked-list-ii/)>) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

```js
// 反转以head为起点的n个节点，返回新的头节点
let successor = null; // 后继
var reverseN = function (head, n) {
  if (n === 1) {
    successor = head.next; // 保存后继
    return head;
  }
  // 以head.next为起点的n-1个节点，返回新的头节点
  let last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = successor;
  return last;
};

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === 1) {
    // 当left为1时，可以看做反转前n个节点
    return reverseN(head, right);
  }
  // 前进到反转的起点 触发base case
  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
};
```

## 回文链表

### [234.回文链表](https://leetcode.cn/problems/palindrome-linked-list/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 反转链表，判断两个链表的值是否完全想等
- 利用函数递归的调用栈，可以拿到反转链表的值
- 然后再后续遍历的位置进行判断，然后再将 left 指针向右偏移即可

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let left = head;

  var traverse = function (right) {
    if (right == null) return true;
    // 后序遍历位置，相当于反转了链表，因为上面的递归函数，让函数入栈了，出栈的第一个函数，就是链表最后一位
    // 这里相当于，让链表的首位进行判断
    let res = traverse(right.next); // 右指针左移
    res = res && right.val === left.val;
    left = left.next; // 左指针右移
    return res;
  };

  return traverse(head);
};
```

### [剑指 Offer II 027. 回文链表](https://leetcode.cn/problems/aMhZSa/) <Badge type="success">easy</Badge>

与[234 题](#234回文链表)解法一样

## [86.分隔链表](https://leetcode.cn/problems/partition-list/) <Badge type="warning">medium</Badge>

时间复杂度 O(1)
空间复杂度 O(N)

- 思路
- 使用指针 p 遍历链表
- 使用两个新链表分别保存小于 x 的节点，和大于 x 的节点
- 最后将两个链表合并返回即可
- 注意：虚拟头节点的链接使用

```js
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let newList1 = new ListNode(-1),
    newList2 = new ListNode(-1);
  let p1 = newList1,
    p2 = newList2;
  let p = head;
  while (p) {
    if (p.val >= x) {
      p2.next = new ListNode(p.val);
      p2 = p2.next;
    } else {
      p1.next = new ListNode(p.val);
      p1 = p1.next;
    }
    p = p.next;
  }

  // 将两个分好类的节点相连
  p1.next = newList2.next;
  return newList1.next;
};
```
