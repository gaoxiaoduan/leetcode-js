/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 贪心算法
// 图解 https://www.yuque.com/docs/share/bc8fecfb-d160-43cc-bf41-d1a00983061a?# 《45.跳跃游戏 II》
var jump = function (nums) {
  const n = nums.length;
  let start = 0,
    end = 0,
    jumps = 0;

  // 走到最后一个位置即可，所以最后一个位置不需要jumps+1，end<n-1即可
  while (end < n - 1) {
    let maxEnd = 0; // [start,end]中最大的结束距离
    for (let i = start; i <= end; i++) {
      maxEnd = Math.max(maxEnd, nums[i] + i);
    }
    start = end; // 更新start
    end = maxEnd; // 更新end
    jumps++; // 次数+1
  }

  return jumps;
};

// 动归（自顶向下）
var jump1 = function (nums) {
  const n = nums.length;
  const memo = new Array(n + 1).fill(Infinity);
  // 返回从p跳到最后一格所需要的最少步数
  const dp = (p) => {
    // base case
    // 当p超过最后一位时，不需要跳跃
    if (p >= n - 1) return 0;
    if (memo[p] !== Infinity) return memo[p];

    let step = nums[p]; // 处于p位置时，可选择的步数
    for (let i = 1; i <= step; i++) {
      // 计算每一个可选择的跳跃步数的最小次数 + 当前跳跃次数
      memo[p] = Math.min(memo[p], dp(p + i) + 1);
    }
    return memo[p];
  };

  return dp(0);
};
// @lc code=end
