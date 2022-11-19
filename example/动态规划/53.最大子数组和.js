/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = new Array(nums.length).fill(0);

  // base case
  dp[0] = nums[0];
  let max = nums[0];

  for (let i = 1; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }

  return max;
};

// 优化时间复杂度 的dp数组解法
var maxSubArray1 = function (nums) {
  let max = 0;
  let res = -Infinity;
  for (const item of nums) {
    max = Math.max(max + item, item); // 计算出i位置上的最大值
    res = Math.max(max, res); // 找出[0...end]区间内 i位置上的最大值
  }
  return res;
};
// @lc code=end
