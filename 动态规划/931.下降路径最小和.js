/*
 * @lc app=leetcode.cn id=931 lang=javascript
 *
 * [931] 下降路径最小和
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let n = matrix.length;
  // 备忘录 根据边界值填充(100 * 100) + 1
  let memo = Array.from({ length: n }).map((_) =>
    Array.from({ length: n }).fill(100 * 100 + 1)
  );

  // 表示从matrix[0][...] 到matrix[i][j]最小路径和，其实就是穷举所有结果
  const dp = (matrix, i, j) => {
    // 边界判断
    if (i < 0 || j < 0 || i >= n || j >= n) return Infinity;

    // base case 就一行
    if (i === 0) return matrix[0][j];

    if (memo[i][j] !== 100 * 100 + 1) return memo[i][j];

    memo[i][j] =
      matrix[i][j] +
      Math.min(
        dp(matrix, i - 1, j),
        dp(matrix, i - 1, j - 1),
        dp(matrix, i - 1, j + 1)
      );

    return memo[i][j];
  };

  let result = Infinity;
  for (let j = 0; j < n; j++) {
    result = Math.min(result, dp(matrix, n - 1, j));
  }

  return result;
};
// @lc code=end
