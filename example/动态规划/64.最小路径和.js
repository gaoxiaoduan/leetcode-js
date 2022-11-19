/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * 动态规划
 * 要想求右下角[0][0]-->[m][n]的最短路径
 * 需要先求出[m-1][n] 和 [m][n-1]的最短路径，
 * 因为我们肯定要从这两个方向进去
 */
// 自顶向下解法
var minPathSum = function (grid) {
  let m = grid.length,
    n = grid[0].length;

  let memo = Array.from({ length: m }).map((_) =>
    Array.from({ length: n }).fill(-1)
  );

  // dp函数表示从0,0 坐标到 i,j的最短路径
  const dp = (grid, i, j) => {
    // base case
    if (i === 0 && j === 0) {
      return grid[0][0];
    }
    // 防止越界情况,返回一个∞，这样在比较最小值的时候不会被记录
    if (i < 0 || j < 0) {
      return Infinity;
    }

    if (memo[i][j] !== -1) {
      return memo[i][j];
    }

    memo[i][j] = Math.min(dp(grid, i - 1, j), dp(grid, i, j - 1)) + grid[i][j];
    return memo[i][j];
  };

  return dp(grid, m - 1, n - 1);
};

//**************************************************************** */

// 自底向上解法
// var minPathSum = function (grid) {
//   let m = grid.length,
//     n = grid[0].length;
//   let dp = Array.from({ length: m }).map((_) => Array.from({ length: n }));
//   // base case
//   dp[0][0] = grid[0][0];

//   for (let i = 1; i < m; i++) {
//     dp[i][0] = dp[i - 1][0] + grid[i][0];
//   }

//   for (let j = 1; j < n; j++) {
//     dp[0][j] = dp[0][j - 1] + grid[0][j];
//   }

//   for (let i = 1; i < m; i++) {
//     for (let j = 1; j < n; j++) {
//       dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
//     }
//   }

//   return dp[m - 1][n - 1];
// };
// @lc code=end
