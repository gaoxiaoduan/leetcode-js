---
nav: JavaScript题解
group:
  title: 基础算法
  order: 1
order: 1
---

# 排序

## [215.数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/) <Badge type="warning">medium</Badge>

快速搜索

- 首先，针对已经排好序的数组，第 k 大，就是 nums\[len-k\]位置上的元素，后序称为 k'
- 在快排分区时，其实已经为 p 找到自己在数组中正确对应的位置
- 若 k' > p,说明要找的元素在 p 的右半部分，也就是 lo=p+1
- 若 k' < p,说明要找的元素在 p 的左半部分，也就是 hi=p-1
- 然后递归，直到 p 的位置刚好是 k'，直接返回这个位置上的元素即可

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let lo = 0,
    hi = nums.length - 1,
    targetIndex = nums.length - k;

  while (lo <= hi) {
    const p = partition(nums, lo, hi);
    if (targetIndex > p) {
      lo = p + 1;
    } else if (targetIndex < p) {
      hi = p - 1;
    } else {
      return nums[p];
    }
  }

  return -1;
};

const partition = (nums, lo, hi) => {
  let p = nums[lo];
  let i = lo + 1,
    j = hi;
  while (i <= j) {
    while (i < hi && nums[i] <= p) {
      i++;
    }
    while (j > lo && nums[j] > p) {
      j--;
    }
    if (i >= j) {
      break;
    }
    swap(nums, i, j);
  }
  swap(nums, lo, j);
  return j;
};

const swap = (nums, i, j) => {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
};
```

时间复杂度 O(N \* log K) N 是 nums 的次数 ，logK 是循环中使用 insert 和 pop 的复杂度
空间复杂度 O(K) k 是 最小堆的长度

- 思路
- 使用最小堆结构的特性解决
- 最小堆的跟是最小的元素
- 在遍历过程中进行插入，此时根元素是最小值，且，其他节点都是比根大的值
- 如果堆中元素个数超过 k，将最小元素踢出堆，即删除根，然后继续插入
- 以上面步骤全部插入堆中后，根元素即第 K 大的元素

```js
// -----------------最小堆解法----------------------
var findKthLargest = function (nums, k) {
  const heap = new MinHeap();
  nums.forEach((item) => {
    heap.insert(item);
    if (heap.size() > k) {
      heap.pop();
    }
  });
  return heap.peek();
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  getLeftIndex(i) {
    return i * 2 + 1;
  }

  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    let temp = this.heap[j];
    this.heap[j] = this.heap[i];
    this.heap[i] = temp;
  }

  shiftUp(index) {
    if (index === 0) return;
    let parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }
}
```

## [315.计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/) <Badge type="error">hard</Badge>

- 技术点
- 运用到快排局部有序的特征
- 在合并数组最后 有序的时候，可以通过两个数组指针的位置，计算出 中间 小于插入元素的数量

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  const len = nums.length;
  const counts = new Array(len).fill(0);
  const temp = new Array(len);
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = {
      index: i,
      val: nums[i],
    };
  }
  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = arr[i];
    }

    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        arr[p] = temp[j++];
      } else if (j === hi + 1) {
        arr[p] = temp[i++];
        counts[arr[p].index] += j - (mid + 1);
      } else if (temp[i].val > temp[j].val) {
        arr[p] = temp[j++];
      } else {
        arr[p] = temp[i++];
        counts[arr[p].index] += j - (mid + 1);
      }
    }
  };

  const sort = (lo, hi) => {
    if (lo === hi) return;
    let mid = Math.floor(lo + (hi - lo) / 2);

    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };

  sort(0, len - 1);

  return counts;
};
```

## [327.区间和的个数](https://leetcode.cn/problems/count-of-range-sum/) <Badge type="error">hard</Badge>

- 使用数组的前缀和，然后对前缀和进行归并排序
- 归并排序中，寻找符合条件的区间

```js
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
  const len = nums.length;
  let preSum = new Array(len + 1).fill(0);
  const temp = new Array(preSum.length);
  for (let i = 0; i < len; i++) {
    preSum[i + 1] = nums[i] + preSum[i];
  }

  let count = 0;

  const merge = (nums, lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // // 这段代码会超时
    // for (let i = lo; i <= mid; i++) {
    //     for (let j = mid + 1; j <= hi; j++) {
    //         const diff = nums[j] - nums[i];
    //         if (diff >= lower && diff <= upper) {
    //             count++;
    //         }
    //     }
    // }

    let start = mid + 1;
    let end = mid + 1;
    for (let i = lo; i <= mid; i++) {
      while (start <= hi && nums[start] - nums[i] < lower) {
        start++;
      }
      while (end <= hi && nums[end] - nums[i] <= upper) {
        end++;
      }
      count += end - start;
    }

    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (nums, lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    sort(nums, lo, mid);
    sort(nums, mid + 1, hi);
    merge(nums, lo, mid, hi);
  };

  sort(preSum, 0, preSum.length - 1);

  return count;
};
```

## [493.翻转对](https://leetcode.cn/problems/reverse-pairs/) <Badge type="error">hard</Badge>

[leetcode 题解](https://leetcode.cn/problems/reverse-pairs/solution/shou-hua-tu-jie-yi-bu-yi-bu-jie-xi-gui-bing-pai-xu/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  const len = nums.length;
  const temp = new Array(len);
  let count = 0;

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // ----左右数组有序之后----
    let start = lo,
      end = mid + 1;

    while (start <= mid && end <= hi) {
      if (nums[start] > 2 * nums[end]) {
        count += mid + 1 - start;
        end++;
      } else {
        start++;
      }
    }

    // ----合并之前----
    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };
  sort(0, len - 1);
  return count;
};
```

## [912.排序数组](https://leetcode.cn/problems/sort-an-array/) <Badge type="warning">medium</Badge>

[题解](https://mp.weixin.qq.com/s/8ZTMhvHJK_He48PpSt_AmQ)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  const temp = new Array(nums.length);

  const merge = function (lo, mid, hi) {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    let i = lo,
      j = mid + 1;

    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[j] < temp[i]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);

    // [lo,mid]有序
    sort(lo, mid);
    // [mid+1,hi]有序
    sort(mid + 1, hi);
    // 合并两个有序数组
    merge(lo, mid, hi);
  };

  sort(0, nums.length - 1);

  return nums;
};
```

归并排序--使用了 shift 方法，比较慢

```js
// 归并排序
var sortArray = function (nums) {
  if (nums.length <= 1) return nums;
  let mid = Math.floor(nums.length / 2);
  let left = sortArray(nums.slice(0, mid));
  let right = sortArray(nums.slice(mid));
  return merge(left, right);
};
const merge = (left, right) => {
  let res = [];
  while (left.length && right.length) {
    res.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return res.concat(left, right);
};
```

快速排序

```js
var sortArray = function (nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
};

// 快速排序
const quickSort = (nums, lo, hi) => {
  if (lo >= hi) return;

  // 对[lo,hi]根据p进行划分
  // nums[lo,p-1] <= nums[p] < nums[p,hi];
  const p = partition(nums, lo, hi);

  quickSort(nums, lo, p - 1);
  quickSort(nums, p + 1, hi);
};

// 对[lo,hi]进行区分
const partition = (nums, lo, hi) => {
  let p = nums[lo];
  let i = lo + 1,
    j = hi;
  while (i <= j) {
    while (i < hi && nums[i] <= p) {
      i++;
      // 结束时，nums[i] > p
    }
    while (j > lo && nums[j] > p) {
      j--;
      // 结束时，nums[j] <= p;
    }
    // 此时 nums[i] <= p < nums[j]
    if (i >= j) {
      break;
    }
    swap(nums, i, j);
  }
  swap(nums, lo, j);
  return j;
};

const swap = (nums, i, j) => {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
};
```
