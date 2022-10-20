/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 自底向上解法
var rob = function (nums) {
  const n = nums.length;
  // 定义dp数组，表示[0...i]的最高金额
  const dp = new Array(n + 1).fill(0);
  // base case
  dp[0] = 0; // 0的位置还没出发
  dp[1] = nums[0]; // 1号位置的最高金额

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 1], // 不抢
      dp[i - 2] + nums[i - 1] // 抢
    );
  }

  return dp[n];
};

// 自顶向下解法
var rob1 = function (nums) {
  const n = nums.length;
  const memo = new Array(n + 1).fill(-1);

  // 定义dp(i)
  // 返回从0开始，经过i时的最高金额
  const dp = (i) => {
    // base case
    if (i <= 0) return 0;
    if (i === 1) return nums[0];
    if (memo[i] !== -1) return memo[i];

    memo[i] = Math.max(
      dp(i - 1), //不抢
      dp(i - 2) + nums[i - 1] // 抢
    );
    return memo[i];
  };

  return dp(n);
};
// @lc code=end
