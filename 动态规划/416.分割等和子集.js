/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let sum = 0;
  for (const i in nums) {
    sum += nums[i];
  }

  if (sum % 2 !== 0) return false;
  sum = sum / 2;
  let n = nums.length;
  // dp[i][j] 表示 对于前 i 个物品，当前背包的容量为 j 时
  // 若 x 为 true，则说明可以恰好将背包装满，若 x 为 false，则说明不能恰好将背包装满
  let dp = Array.from({ length: n + 1 }).map((_) =>
    Array.from({ length: sum + 1 }).fill(false)
  );

  // base case
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      // 当背包容量小于要装入的容量时，装不进去
      if (j < nums[i - 1]) {
        // 装不进去
        dp[i][j] = dp[i - 1][j];
      } else {
        // 装不进去 || 装进去
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      }
    }
  }

  return dp[n][sum];
};
// @lc code=end
