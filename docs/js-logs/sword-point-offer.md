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

## [剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/) <Badge type="success">easy</Badge>

- 思路
- 由于字符串具有不可修改的特性
- 所以先把字符串打散成数组，然后去修改空格键部分
- 最后拼接返回即可
- 或者直接使用 replaceAll 替换

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  // return s.replaceAll(' ', '%20');
  const res = s.split('');
  for (let i = 0; i < res.length; i++) {
    if (res[i] === ' ') {
      res[i] = '%20';
    }
  }
  return res.join('');
};
```

## [剑指 Offer 58 - II. 左旋转字符串](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/) <Badge type="success">easy</Badge>

- 若不能使用 substring 函数
- 也可以将字符串转成数组操作，然后把被截取的字符串拼到数组后面

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function (s, n) {
  return s.substring(n) + s.substring(0, n);
};
```

## [剑指 Offer 03. 数组中重复的数字](https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 使用 set 内元素不重复的特点
- 遍历整个数组，若元素已经存在与 set 内，返回即可
- 若 set 内不存在，就进行添加操作
- 跟[442.数组中重复的数据](/js-logs/array#442数组中重复的数据)思路类似

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  var set = new Set();
  for (var i = 0; i < nums.length; i++) {
    var c = nums[i];
    if (set.has(c)) {
      return c;
    } else {
      set.add(c);
    }
  }
};
```

## [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(2\* logN) => O(logN)
空间复杂度 O(1)

- 思路(二分查找)
- 跟[34.在排序数组中查找元素的第一个和最后一个位置](/js-logs/binary-search#34在排序数组中查找元素的第一个和最后一个位置)相似
- 用二分法，分别搜索 target 的左右边界
- 如果搜索的边界有效就返回 左右边界区间的长度
- 如果搜索的边界为-1，说明搜索越界，返回 0 即可

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 0) return 0;
  const left = leftSearch(nums, target);
  const right = rightSearch(nums, target);
  if (left === -1 || right === -1) return 0;
  return right - left + 1;
};

// 返回左边界的索引
var leftSearch = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      // 收缩左边界，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] > target) {
      // mid太大了，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] < target) {
      // mid太小了，扩大范围[mid+1,right]
      left = mid + 1;
    }
  }
  // left的范围是[0,nums.length]
  return nums[left] === target ? left : -1;
};

// 返回右边界的索引
var rightSearch = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      // 收缩左边界，缩小范围[mid+1,right]
      left = mid + 1;
    } else if (nums[mid] > target) {
      // mid太大了，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] < target) {
      // mid太小了，扩大范围[mid+1,right]
      left = mid + 1;
    }
  }
  // right的范围是[-1,nums.length-1]
  return nums[right] === target ? right : -1;
};
```

时间复杂度 O(N)
空间复杂度 O(1)

- 普通思路
- 遍历数组
- 如果 num===target，res 就累加

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      res += 1;
    }
  }
  return res;
};
```

## [剑指 Offer 53 - II. 0 ～ n-1 中缺失的数字](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/) <Badge type="success">easy</Badge>

- 思路
- 因为异或满足交换律
- a ^ b ^ a = b ^ (a ^ a);
- 所以可以将数组内的元素跟[0,n]异或一下
- 结果就是丢失的数字
- 跟[268.丢失的数字](/js-logs/bit-manipulation#268丢失的数字)相同

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const n = nums.length;
  let res = 0;
  res ^= n;
  for (let i = 0; i < n; i++) {
    res ^= nums[i] ^ i;
  }

  return res;
};
```

- 两个等差数列
- `sum(nums) - sum([0,n])`就是缺的那个元素

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber1 = function (nums) {
  let sumNums = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sumNums += nums[i];
    sum += i + 1;
  }
  return sum - sumNums;
};
```

<embed src="@/example/剑指Offer/剑指Offer04.二维数组中的查找.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer11.旋转数组的最小数字.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer50.第一个只出现一次的字符.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer32-I.从上到下打印二叉树.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer32-II.从上到下打印二叉树II.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer32-III.从上到下打印二叉树III.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer26.树的子结构.md"></embed>

<embed src="@/example/二叉树/剑指Offer27.二叉树的镜像.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer28.对称的二叉树.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer10-I.斐波那契数列.md"></embed>

<embed src="@/example/动态规划/剑指Offer10-II.青蛙跳台阶问题.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer63.股票的最大利润.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer42.连续子数组的最大和.md"></embed>

<embed src="@/example/剑指Offer/剑指Offer47.礼物的最大价值.md"></embed>
