---
nav: JavaScript题解
group:
  title: 进阶算法
  order: 2
order: 3
---

# 贪心算法

## [55.跳跃游戏](https://leetcode.cn/problems/jump-game/) <Badge type="warning">medium</Badge>

题目理解：
求最远能跳多远的距离？若最远距离超出数组长度，表示可以到达最后一个下标
反之不能到达

- 这道题表面上不是求最值，但是可以改一改：
- 请问通过题目中的跳跃规则，最多能跳多远？如果能够越过最后一格，返回 true，否则返回 false。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let len = nums.length;
  let farthest = 0; // 最远距离
  for (let i = 0; i < len - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest - i <= 0) {
      return false;
    }
  }
  return farthest >= len - 1;
};
```

## [45.跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/) <Badge type="warning">medium</Badge>

贪心算法
时间复杂度 O(N)
空间复杂度 O(1)

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211221118714.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let len = nums.length;
  let farthest = 0;
  let end = 0;
  let jump = 0;
  for (let i = 0; i < len - 1; i++) {
    farthest = Math.max(i + nums[i], farthest);
    if (end === i) {
      jump++;
      end = farthest;
    }
  }
  return jump;
};
```

动态规划解法
时间复杂度 O(N^2)
空间复杂度 O(1)

```js
// 动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let len = nums.length;
  let memo = Array.from({ length: len }).fill(len);
  //表示从p处跳到最后位置的最少步数
  const dp = (nums, p) => {
    // base case
    // 当 p 到达最后的位置，不用跳，返回0
    if (p >= len - 1) return 0;
    if (memo[p] !== len) return memo[p];
    let step = nums[p];
    for (let i = 1; i <= step; i++) {
      let subProblum = dp(nums, nums[i] + i);
      memo[p] = Math.min(memo[p], subProblum + 1);
    }
    return memo[p];
  };

  return dp(nums, 0);
};
```

## [376.摆动序列](https://leetcode.cn/problems/wiggle-subsequence/) <Badge type="warning">medium</Badge>

贪心算法
[官方题解](https://leetcode.cn/problems/wiggle-subsequence/solution/bai-dong-xu-lie-by-leetcode-solution-yh2m/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  const n = nums.length;
  if (n < 2) return n;

  let preDiff = nums[1] - nums[0];
  // base case
  // 若前两位数差为0，那么最长的摆动子序列就是1，否则就是前两位数字
  let res = preDiff !== 0 ? 2 : 1;

  for (let i = 2; i < n; i++) {
    const diff = nums[i] - nums[i - 1]; // 当前i与i-1的差
    //若diff与preDiff是【峰】【谷】的或是【谷】【峰】的，res+1
    if ((diff > 0 && preDiff <= 0) || (diff < 0 && preDiff >= 0)) {
      res++;
      preDiff = diff;
    }
  }

  return res;
};
```

动态规划
定义 up 数组 up[i]表示以前 i 个元素中的某一个为结尾的最长的「上升摆动序列」的长度
定义 down 数组 down[i]表示以前 i 个元素中的某一个为结尾的最长的「下降摆动序列」的长度
动态转移方程
`(nums[i] <= nums[i-1]) up[i] = up[i-1];`
`(nums[i] > nums[i-1]) up[i] = max(up[i-1],down[i-1]+1);`

`(nums[i] >= nums[i-1]) down[i] = down[i-1];`
`(nums[i] < nums[i-1]) down[i] = max(down[i-1],up[i-1]+1);`

```js
var wiggleMaxLength = function (nums) {
  const n = nums.length;
  if (n < 2) return n;
  const up = new Array(n).fill(0);
  const down = new Array(n).fill(0);
  up[0] = down[0] = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up[i] = Math.max(up[i - 1], down[i - 1] + 1);
      down[i] = down[i - 1];
    } else if (nums[i] < nums[i - 1]) {
      down[i] = Math.max(down[i - 1], up[i - 1] + 1);
      up[i] = up[i - 1];
    } else if (nums[i] === nums[i - 1]) {
      up[i] = up[i - 1];
      down[i] = down[i - 1];
    }
  }

  return Math.max(up[n - 1], down[n - 1]);
};
```

## [435.无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)
思路笔记：-->利用贪心算法

- 核心思路
- 求出有多少不重复的区间，再用总数 - 不重复的区间数
- 如何求出不重复区间数？
  - 跟据 end 进行升序排列
  - 找出跟 end 不重叠的区间，计数器++，改变 end 的值，继续遍历

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // 如果为空，不需要改变
  if (!intervals.length) return 0;
  let endSortArr = intervals.sort((a, b) => a[1] - b[1]);

  // 计算有多少不重复的区间，至少为 开头的数量1
  let count = 1;
  let end_start = endSortArr[0][1];

  for (let item of endSortArr) {
    if (item[0] >= end_start) {
      count++;
      end_start = item[1];
    }
  }

  return endSortArr.length - count;
};
```

## [452.用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 其实题目最后要找的还是不重叠的区间数
- 这里要注意的是， xstart ≤ x ≤ xend 就会射爆气球

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  let endSortArr = points.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let end_start = endSortArr[0][1];
  for (let item of endSortArr) {
    if (item[0] > end_start) {
      count++;
      end_start = item[1];
    }
  }

  return count;
};
```

## [1024.视频拼接](https://leetcode.cn/problems/video-stitching/) <Badge type="warning">medium</Badge>

```js
/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
var videoStitching = function (clips, time) {
  if (time === 0) return 0;
  let clipsArr = clips.sort((a, b) => {
    if (a[0] === b[0]) {
      // 如果开头相同，将最长的片段放到最前面
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  let res = 0;
  let curEnd = 0,
    nextEnd = 0;
  let i = 0,
    len = clipsArr.length;

  while (i < len && clipsArr[i][0] <= curEnd) {
    while (i < len && clipsArr[i][0] <= curEnd) {
      nextEnd = Math.max(nextEnd, clipsArr[i][1]);
      i++;
    }

    res++;
    curEnd = nextEnd;
    if (curEnd >= time) {
      return res;
    }
  }

  // 没找到,返回-1
  return -1;
};
```
