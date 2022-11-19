/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const n = triangle.length;
  const dp = new Array(n).fill().map(() => new Array(n).fill(Infinity));
  // base case
  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) {
        dp[i][j] = triangle[i][j] + dp[i - 1][j];
      } else {
        dp[i][j] = triangle[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }

  let res = Infinity;
  for (let j = 0; j < dp[n - 1].length; j++) {
    res = Math.min(res, dp[n - 1][j]);
  }
  return res;
};
// @lc code=end
