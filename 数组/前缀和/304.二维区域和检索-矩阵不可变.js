/*
 * @lc app=leetcode.cn id=304 lang=javascript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
/**
 * 时间复杂度O(1)
 * 空间复杂度O(M*N)
 * 思路
 * - 前缀和
 * - 目标矩阵通过相邻矩阵运行得到目标区域和
 * ![](https://coderduan-image.oss-cn-hangzhou.aliyuncs.com/img/202209161128933.png)
- 定义preSum[i,j]记录着 matrix[0][0] 到matrix[i-1][j-1]的元素和(前缀和)
 */
var NumMatrix = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  // 定义preSum[i,j]记录着 matrix[0][0] 到matrix[i-1][j-1]的元素和(前缀和)
  this.preSum = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0));
  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      this.preSum[i][j] =
        this.preSum[i - 1][j] +
        this.preSum[i][j - 1] +
        matrix[i - 1][j - 1] -
        this.preSum[i - 1][j - 1];
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return (
    this.preSum[row2 + 1][col2 + 1] -
    this.preSum[row1][col2 + 1] -
    this.preSum[row2 + 1][col1] +
    this.preSum[row1][col1]
  );
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end
