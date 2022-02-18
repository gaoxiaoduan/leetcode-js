/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * 动态规划
 * dp[i] 表示nums 前i个元素的最长递增子序列数
 * base case：全部初始化为1，因为前i个元素至少为1
 * 动态转移方程 dp[i] = max(dp[i], xxx)；
 * 最后根据dp数组找出nums.length中最大的那个值
 */
var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 若发现是递增的，为dp[i]找最长的那个子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // 找出dp数组中最大的那个值
  let max = 0;
  for (let i of dp) {
    max = Math.max(max, i);
  }
  return max;
};
// @lc code=end
