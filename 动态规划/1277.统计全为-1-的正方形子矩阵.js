/*
 * @lc app=leetcode.cn id=1277 lang=javascript
 *
 * [1277] 统计全为 1 的正方形子矩阵
 */

// @lc code=start
//类似 221. 最大正方形： https://leetcode.cn/problems/maximal-square/
// ![dp数组图](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210131221045.png)
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  let count = 0;
  const m = matrix.length,
    n = matrix[0].length;
  // 我们用 f[i][j] 表示以(i, j) 为右下角的正方形的最大边长，
  // 除此定义之外，f[i][j] = x 也表示以(i, j) 为右下角的正方形的数目为 x（即边长为 1, 2, ..., x 的正方形各一个）。
  // 在计算出所有的 f[i][j] 后，我们将它们进行累加，就可以得到矩阵中正方形的数目
  const dp = new Array(m).fill(0).map((_) => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = matrix[i][j];
      } else if (matrix[i][j] === 0) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
      count += dp[i][j];
    }
  }
  return count;
};
// @lc code=end
