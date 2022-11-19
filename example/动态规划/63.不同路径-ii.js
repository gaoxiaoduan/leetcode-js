/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid.length === 0) return 0;
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length;
  const memo = new Array(m).fill(-1).map((_) => new Array(n).fill(-1));

  // 定义dp函数返回从0,0走到i,j的路径数量
  const dp = (i, j) => {
    // base case
    // 越界和碰撞物的判断
    if (i < 0 || j < 0 || obstacleGrid[i][j] === 1) return 0;
    if (i === 0 && j === 0) return 1; // 到达0,0点

    if (memo[i][j] !== -1) return memo[i][j];

    memo[i][j] = dp(i - 1, j) + dp(i, j - 1);
    return memo[i][j];
  };

  return dp(m - 1, n - 1);
};
// @lc code=end
