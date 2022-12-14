---
nav: JavaScript题解
group: 基础数据结构
order: 0
---

# [数组](https://leetcode.cn/tag/array/problemset/)

数组是在程序设计中，把具有相同类型的若干元素按有序的形式组织起来的一种形式。

作为线性表的实现方式之一，数组中的元素在内存中是**连续**存储的，且每个元素占相同大小的内存。

## 双指针

### [5.最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/) <Badge type="warning">medium</Badge>

时间复杂度 O(N^2)
空间复杂度 O(1)

- 思路（中心向外扩散的左右指针）
- 回文指的就是正反念都一样的串
- 我们可以根据这个特性使用左右指针共同向外扩散，来判断是否为一个回文串
- 我们还要考虑到，回文串长度的奇偶性
- 这里我们先编写一个函数，函数返回回文串，这里使用 l，r 两个函数，兼容了奇偶的情况
- 然后遍历这个字符串，分别找奇数情况(i,i)下的回文串，和偶数情况(i,i+1)下的回文串
- 然后保留最长的那一个回文串返回即可

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 0 || s.length === 1) return s;
  let res = '';
  for (let i = 0; i < s.length; i++) {
    // 以s[i]为中心
    let res1 = palindrome(s, i, i);
    // 以s[i]，s[i+1]为中心
    let res2 = palindrome(s, i, i + 1);
    res = res1.length > res.length ? res1 : res;
    res = res2.length > res.length ? res2 : res;
  }
  return res;
};

// 在s中找出以s[l],s[r]为中心的回文串
var palindrome = (s, l, r) => {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  // 返回以 s[l],s[r] 为中心的最长回文串
  // 当while循环结束的时候，l是少一个的，r是多一个的，由于substring的范围是[s,e）的，所以l需要+1，r刚好，所以不用操作
  return s.substring(l + 1, r);
};
```

### [26.删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/) <Badge type="success">easy</Badge>

时间复杂度 O(1)
空间复杂度 O(1)

- 思路
- 使用快慢指针
- 让快指针去探路
- 探路的过程中比较慢指针是否和快指针对应的值相等
- 若不相等，说明不是重复元素，将慢指针前进一步，将快指针对应的值赋值到慢指针的位置上
- 这样 nums[0-slow]的位置都是不重复元素

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) return 0;
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
  }
  return slow + 1;
};
```

### [27.移除元素](https://leetcode.cn/problems/remove-element/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 快慢指针
- 跳过对目标 val 的处理，这样就相当于删除了 val
- 对于不等于 val 的数据，做指针的偏移处理

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  if (nums.length === 0) return 0;
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};
```

### [83.删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 快慢指针法，与 [26.删除有序数组中的重复项](#26删除有序数组中的重复项)相似
- 因为链表已经有序，所以可以使用快指针在前面探路
- 当遇到元素不相等的情况时，说明不是重复元素
- 此时可以将 slow 指针的 next 指向快指针，这样就能让不重复的元素相连接
- 然后再将 slow 指针指向 fast，fast 指针继续探路
- 当 fast 指针探路结束，断开 slow 后的所有链接，即 slow.next=null;这样做可以维护 slow 走过的链表不重复，返回 head 即可

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head === null) return null;
  let slow = head,
    fast = head;
  while (fast !== null) {
    if (fast.val !== slow.val) {
      // 将slow的下一个节点与fast相连
      slow.next = fast;
      // slow移动到fast的位置
      slow = fast;
    }
    fast = fast.next;
  }
  // 断开后面所有连接
  slow.next = null;
  return head;
};
```

### [283.移动零](https://leetcode.cn/problems/move-zeroes/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 先使用快慢指针法，将不为 0 的元素，按照之前顺序排在前面
- 然后将 slow 之后的元素全部设置为 0 即可

```js
// 27.移除元素 https://leetcode.cn/problems/remove-element/
var removeElement = function (nums, val) {
  if (nums.length === 0) return 0;
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // 先使用【移除元素】，将数组中0的元素删除
  // 返回nums的length，且nums[0,p-1]已经原地删除了0
  let p = removeElement(nums, 0);
  for (; p < nums.length; p++) {
    nums[p] = 0;
  }
  return nums;
};
```

### [344.反转字符串](https://leetcode.cn/problems/reverse-string/) <Badge type="success">easy</Badge>

时间复杂度 O(logN)
空间复杂度 O(1)

- 思路
- 左右指针
- 交换左右指针的值即可

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  if (s.length === 0 || s.length === 1) return s;
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
};
```

### [557.反转字符串中的单词 III](https://leetcode.cn/problems/reverse-words-in-a-string-iii/) <Badge type="success">easy</Badge>

- 思路
- 根据空格拆分成单字符串的数组
- 然后根据 [344.反转字符串](#344反转字符串)，分别反转单字符串
- 最后合并成一个字符串

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const singleWorldNums = s.split(' ');
  return singleWorldNums
    .map((item) => {
      return reverseString(item.split('')).join('');
    })
    .join(' ');
};

var reverseString = function (s) {
  if (s.length === 0 || s.length === 1) return s;
  let left = 0,
    right = s.length - 1;

  const swap = (i, j) => {
    let temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  };

  while (left < right) {
    swap(left, right);
    left++;
    right--;
  }
  return s;
};
```

## 前缀和

### [303.区域和检索-数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/) <Badge type="success">easy</Badge>

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211221048704.png" style="max-width:100%" />
  <div align=center>前缀和</div>
</div>

时间复杂度 O(1)
空间复杂度 O(N)

- 思路
- 前缀和 解法
- 初始化是计算前缀和 preSum,preSum 第一位存储 0，方便后面计算，所以长度要比 nums+1
- nums: 0 1 2 3 4 5
- ---> : [ 3 5 2 -2 4 1 ]
- preSum:0 1 2 3 4 5 6
- -----> : [ 0 3 8 10 8 12 13 ]
- 核心- 思路是我们 new 一个新的数组 preSum 出来，preSum[i] 记录 nums[0..i-1] 的累加和,看图 10 = 3 + 5 + 2：
- 如果我想求索引区间 [1, 4] 内的所有元素之和，就可以通过 preSum[5] - preSum[1] 得出

```js
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.preSum = new Array(nums.length + 1).fill(0);
  for (let i = 1; i < this.preSum.length; i++) {
    this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.preSum[right + 1] - this.preSum[left];
};
```

- 根据题意求和

```js
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let res = 0;
  for (let i = left; i <= right; i++) {
    res += this.nums[i];
  }
  return res;
};
```

### [304.二维区域和检索-矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/) <Badge type="warning">medium</Badge>

时间复杂度 O(1)
空间复杂度 O(M\*N)

- 思路
- 前缀和
- 目标矩阵通过相邻矩阵运行得到目标区域和

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211221049678.png" style="max-width:100%" />
  <div align=center>前缀和的矩阵运算</div>
</div>

- 定义 preSum[i,j]记录着 matrix[0][0] 到 matrix[i-1][j-1]的元素和(前缀和)

```js
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  // 定义preSum[i,j]记录着 matrix[0][0] 到matrix[i-1][j-1]的元素和(前缀和)
  this.preSum = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0));
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      this.preSum[i][j] =
        this.preSum[i - 1][j] +
        this.preSum[i][j - 1] +
        matrix[i - 1][j - 1] -
        this.preSum[i - 1][j - 1];
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.preSum[row2 + 1][col2 + 1] -
    this.preSum[row1][col2 + 1] -
    this.preSum[row2 + 1][col1] +
    this.preSum[row1][col1]
  );
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
```

### [1314.矩阵区域和](https://leetcode.cn/problems/matrix-block-sum/) <Badge type="warning">medium</Badge>

- 思路
- 运用到了前缀和的- 思路
- 使用 [304 题](#304二维区域和检索-矩阵不可变)的解法
- 再对边界情况做处理就可以直接使用 304 的题解了

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211192009568.png" style="max-width:100%" />
  <div align=center>矩阵区域和</div>
</div>

```js
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  const m = mat.length,
    n = mat[0].length;
  let res = new Array(m).fill().map((_) => new Array(n).fill(0));

  const numMatrix = new NumMatrix(mat);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 左上角坐标（x1,y1）
      let x1 = Math.max(i - k, 0);
      let y1 = Math.max(j - k, 0);
      // 右下角的坐标
      let x2 = Math.min(i + k, m - 1);
      let y2 = Math.min(j + k, n - 1);
      res[i][j] = numMatrix.sumRegion(x1, y1, x2, y2);
    }
  }

  return res;
};
// 304题目
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  // 定义preSum[i,j]记录着 matrix[0][0] 到matrix[i-1][j-1]的元素和(前缀和)
  this.preSum = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0));
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      this.preSum[i][j] =
        this.preSum[i - 1][j] +
        this.preSum[i][j - 1] +
        matrix[i - 1][j - 1] -
        this.preSum[i - 1][j - 1];
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.preSum[row2 + 1][col2 + 1] -
    this.preSum[row1][col2 + 1] -
    this.preSum[row2 + 1][col1] +
    this.preSum[row1][col1]
  );
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
```

<embed src="@/example/数组/前缀和/238.除自身以外数组的乘积.md"></embed>

## 差分数组

### [1109.航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings/) <Badge type="warning">medium</Badge>

时间复杂度 O(2N)
空间复杂度 O(2N)

- 思路(差分数组)
- 这个题目其实就是将一个长度为 n 的数组，全部初始化为 0
- 然后根据区间，同时增加值
- 就是用差分数组来解，[i,j,val] 可以在 i，j 的范围内同时增加 val
- 难点在于正确构建差分数组
- 1. 构建公式：diff[i] = nums[i] - nums[i-1]
- 2. 还原公式：nums[i] = nums[i-1] + diff[i];
- 3. increment 公式，根据还原公式来看，diff[i] += val，就可以让 nums[i,...]的值一起增加 val
- 然后在 diff[j+1]处，将差缩小 val，就可以让 nums[i,j]的值同时增加 val，也就是 diff[j+1] -=val;
- 要注意的是：让 j+1>= diff.length 时，也就是说对 nums[i]之后的所有元素全部增加 val，所以就不用再给 diff 数组减 val 了

```js
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  let nums = new Array(n).fill(0);
  const df = new Diff(nums);
  for (let item of bookings) {
    const [i, j, val] = item;
    // 这里i,j是从1开始的
    // 转化成数组要-1
    df.increment(i - 1, j - 1, val);
  }
  return df.result();
};

class Diff {
  constructor(nums) {
    this.nums = nums;
    this.len = nums.length;
    this.diff = [];
    // nums: [ 8, 5, 3, 6, 2 ]
    // diff: [ 8,-3,-2, 3,-4 ]
    // 区间加减[i,j]，例如:nums[1,3]+3,就是diff[i]+3,diff[j+1]-3,经过还原后区间就整体加3了
    // nums: [ 8, 5, 3, 6, 2 ] ==》还原后 [ 8, 8, 6, 9, 2 ]
    // diff: [ 8,-3,-2, 3,-4 ] ==》操作后 [ 8, 0,-2, 3,-7 ]
    //            ⬆       ⬆
    //          -3+3     -4-3
    //            0       -7
    this.init();
  }

  init() {
    this.diff[0] = this.nums[0];
    for (let i = 1; i < this.len; i++) {
      this.diff[i] = this.nums[i] - this.nums[i - 1];
    }
  }

  result() {
    this.nums[0] = this.diff[0];
    for (let i = 1; i < this.len; i++) {
      this.nums[i] = this.nums[i - 1] + this.diff[i];
    }
    return this.nums;
  }

  // 对nums[i,j]区间整体+val val可以是负数
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.len) {
      this.diff[j + 1] -= val;
    }
  }
}
```

### [1094.拼车](https://leetcode.cn/problems/car-pooling/) <Badge type="warning">medium</Badge>

```js
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const nums = new Array(1001).fill(0);
  const df = new Diff(nums);
  for (let item of trips) {
    const [val, i, j] = item;
    // 乘客在i上车
    // 在j已经下车，所以j要-1
    df.increment(i, j - 1, val);
  }
  df.result();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > capacity) {
      return false;
    }
  }
  return true;
};

class Diff {
  constructor(nums) {
    this.nums = nums;
    this.len = nums.length;
    this.diff = [];
    this.init();
  }

  init() {
    this.diff[0] = this.nums[0];
    for (let i = 1; i < this.len; i++) {
      this.diff[i] = this.nums[i] - this.nums[i - 1];
    }
  }

  result() {
    this.nums[0] = this.diff[0];
    for (let i = 1; i < this.len; i++) {
      this.nums[i] = this.nums[i - 1] + this.diff[i];
    }
    return this.nums;
  }

  // 对nums[i,j]区间整体+val val可以是负数
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.len) {
      this.diff[j + 1] -= val;
    }
  }
}
```

## 二位数组的花式遍历技巧

<embed src="../../example/数组/二位数组的花式遍历技巧/48.旋转图像.md"></embed>

<embed src="../../example/数组/二位数组的花式遍历技巧/54.螺旋矩阵.md"></embed>

## [88.合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/) <Badge type="success">easy</Badge>

时间复杂度 O(n)

- 双指针法，从头开始对比，将对比结果放入一个新数组中，
- 然后再根据新数组的结果，改变 nums1

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 双指针法
var merge = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0;
  let sortArr = new Array(m + n).fill(0);
  let cur;
  while (p1 < m || p2 < n) {
    let n1 = nums1[p1];
    let n2 = nums2[p2];
    if (p1 === m) {
      // 当p1走到头
      cur = n2;
      p2++;
    } else if (p2 === n) {
      // 当p2走到头
      cur = n1;
      p1++;
    } else if (n1 < n2) {
      // 当n1小于n2，则当前数字为n1
      cur = n1;
      p1++;
    } else {
      // 当n1大于n2，则当前数字为n2
      // 当n1等于n2，随意取一个，这里就取n2
      cur = n2;
      p2++;
    }
    sortArr[p1 + p2 - 1] = cur;
  }

  for (let i = 0; i < sortArr.length; i++) {
    nums1[i] = sortArr[i];
  }
};
// ----------------------------------------------------------------
// 这里将nums2截取到nums1中，然后排序
var merge1 = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};
```

## [189.轮转数组](https://leetcode.cn/problems/rotate-array/) <Badge type="warning">medium</Badge>

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  if (nums.length === 1) return nums;
  k = k % nums.length;
  let spliceStart = nums.length - k;
  let kNums = nums.splice(spliceStart);
  if (spliceStart < 0) {
    reverse(nums, 0, nums.length - 1);
  }
  nums.unshift(...kNums);
};
const reverse = (arr, start, end) => {
  while (start < end) {
    [arr[start++], arr[end--]] = [end, start];
  }
};

var rotate1 = function (nums, k) {
  const n = nums.length;
  const move = n - (k % n);
  const endNums = nums.splice(move);
  nums.unshift(...endNums);
};
```

## [542.01 矩阵](https://leetcode.cn/problems/01-matrix/) <Badge type="warning">medium</Badge>

- 广度优先思路
- 时间复杂度 空间复杂度都是 O(mn)
- 由于 0 到‘0’的距离就是 0
- 可以先单独看，单独一个 0 到上下左右四个方向的，就是由 0 向外扩散+1
- 所以可以采用广度遍历的方法
- 先把所有的 0 找出来，同时使用 visited 表示已经访问（计算）过
- 把找出来的 0 放入队列，然后单独的向外扩散，计算扩散的距离
- 同时做访问标记，然后把计算的坐标也入队列，等所有 0 计算完，再往外扩散 1..以此类推
- 若已经访问过（计算）过，则不需要二次计算
- 这样向外扩散一遍后，可以保证计算出每个位置到最近的 0 的距离

```js
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 动态规划
var updateMatrix = function (mat) {
  const m = mat.length,
    n = mat[0].length;
  const dist = new Array(m).fill().map((_) => new Array(n).fill(Infinity));

  // 先把0放入队列中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
      }
    }
  }

  // 水平向左，垂直向上
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
      }
      if (j - 1 >= 0) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
      }
    }
  }
  // 水平向右，垂直向下
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i + 1 < m) {
        dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
      }
      if (j + 1 < n) {
        dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
      }
    }
  }

  return dist;
};

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 广度优先遍历
var updateMatrix1 = function (mat) {
  const m = mat.length,
    n = mat[0].length;
  const dist = new Array(m).fill().map((_) => new Array(n).fill(0));
  const visited = new Array(m).fill().map((_) => new Array(n).fill(false));
  const q = [];
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 先把0放入队列中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        q.push([i, j]);
        visited[i][j] = true;
      }
    }
  }

  while (q.length) {
    const [i, j] = q.shift();
    for (let d = 0; d < 4; d++) {
      let ni = direction[d][0] + i;
      let nj = direction[d][1] + j;
      if (ni >= 0 && nj >= 0 && ni < m && nj < n && !visited[ni][nj]) {
        dist[ni][nj] = dist[i][j] + 1;
        q.push([ni, nj]);
        visited[ni][nj] = true;
      }
    }
  }

  return dist;
};
```

## [994.腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/) <Badge type="warning">medium</Badge>

- 跟 [542.01 矩阵](#54201-矩阵)解法相似
- 只变换橘子位置
- 求最大的结果，如果有-1，返回-1

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const dist = new Array(m).fill().map((_) => new Array(n).fill(0));
  const visited = new Array(m).fill().map((_) => new Array(n).fill(false));
  const q = [];
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 先把2放入队列中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        q.push([i, j]);
        visited[i][j] = true;
      } else if (grid[i][j] === 1) {
        dist[i][j] = -1; // -1 表示新鲜橘子
      }
    }
  }

  while (q.length) {
    const [i, j] = q.shift();
    for (let d = 0; d < 4; d++) {
      let ni = direction[d][0] + i;
      let nj = direction[d][1] + j;
      if (ni >= 0 && nj >= 0 && ni < m && nj < n && !visited[ni][nj]) {
        if (dist[ni][nj] === -1) {
          dist[ni][nj] = dist[i][j] + 1;
          q.push([ni, nj]);
          visited[ni][nj] = true;
        }
      }
    }
  }

  let res = -1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dist[i][j] === -1) return -1;
      res = Math.max(res, dist[i][j]);
    }
  }

  return res;
};
```

## [1034.边界着色](https://leetcode.cn/problems/coloring-a-border/) <Badge type="warning">medium</Badge>

```js
/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
// 深度优先
var colorBorder = function (grid, row, col, color) {
  const m = grid.length,
    n = grid[0].length;
  const origColor = grid[row][col];
  const visited = new Array(m).fill().map((_) => new Array(n).fill(0));
  visited[row][col] = true;
  const borders = [];

  const direct = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  const dfs = (i, j) => {
    let isBorder = false;
    for (let z = 0; z < 4; z++) {
      const x = direct[z][0] + i,
        y = direct[z][1] + j;
      // 找出边界
      if (!(x >= 0 && y >= 0 && x < m && y < n && grid[x][y] === origColor)) {
        // 重点
        isBorder = true;
      } else if (!visited[x][y]) {
        visited[x][y] = true;
        dfs(x, y);
      }
    }
    if (isBorder) {
      borders.push([i, j]);
    }
  };
  dfs(row, col);

  for (let i = 0; i < borders.length; i++) {
    const x = borders[i][0],
      y = borders[i][1];
    grid[x][y] = color;
  }

  return grid;
};
```

## [442.数组中重复的数据](https://leetcode.cn/problems/find-all-duplicates-in-an-array/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 使用 set 内元素不重复的特点
- 遍历数组，若 set 内没有 num，则向 set 内添加
- 如果 set 内已经有 num 了，那么 num 就是重复的添加到 res 中
- 跟[剑指 Offer 03. 数组中重复的数字](/js-logs/sword-point-offer#剑指-offer-03-数组中重复的数字)思路类似

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const set = new Set();
  const res = [];
  for (const num of nums) {
    if (set.has(num)) {
      res.push(num);
    } else {
      set.add(num);
    }
  }
  return res;
};
```

<embed src="@/example/数组/240.搜索二维矩阵-ii.md"></embed>

<embed src="@/example/数组/169.多数元素.md"></embed>
