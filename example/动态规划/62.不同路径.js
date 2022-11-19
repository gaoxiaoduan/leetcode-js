/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const memo = new Array(m).fill(-1).map((_) => new Array(n).fill(-1));

  // 定义dp函数返回从0,0走到i,j的路径数量
  const dp = (i, j) => {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    memo[i][j] = dp(i - 1, j) + dp(i, j - 1);
    return memo[i][j];
  };
  return dp(m - 1, n - 1);
};
// @lc code=end
