/*
 * @lc app=leetcode.cn id=312 lang=javascript
 *
 * [312] 戳气球
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  let n = nums.length;
  let points = new Array(n + 2);
  points[0] = points[n + 1] = 1; // 在首位添加虚拟气球
  for (let i = 1; i <= n; i++) {
    points[i] = nums[i - 1];
  }

  // dp[i][j] 表示开区间 (i,j)范围内，获得硬币最大数量
  let dp = Array.from({ length: n + 2 }).map((_) =>
    Array.from({ length: n + 2 }).fill(0)
  );
  for (let i = n; i >= 0; i--) {
    for (let j = i + 1; j < n + 2; j++) {
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + points[i] * points[k] * points[j]
        );
      }
    }
  }

  return dp[0][n + 1];
};
// @lc code=end
