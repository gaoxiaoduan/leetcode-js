/*
 * @lc app=leetcode.cn id=1314 lang=javascript
 *
 * [1314] 矩阵区域和
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
//  - 思路
//  - 运用到了前缀和的思路
//  - 使用304题的解法https://leetcode.cn/problems/range-sum-query-2d-immutable/submissions/
//  - 再对边界情况做处理就可以直接使用304的题解了
// https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=1314.%20%E7%9F%A9%E9%98%B5%E5%8C%BA%E5%9F%9F%E5%92%8C.png#R5Vhdb9sgFP01lraHVsGYfDw2Sbs9bFKlPqzdG7FJjGYbC%2BPG6a8fBGxjkyhtVyvb8mTuAa7hngMX8OAirb5wnMffWUQSzx9FlQeXnu%2BDwB%2FLj0J2GpnMAg1sOI1MoxZ4oC%2FEgCODljQiRaehYCwRNO%2BCIcsyEooOhjln226zNUu6f83xhjjAQ4gTF%2F1BIxFrdOpPWvwroZu4%2FjMYz3RNiuvGZiZFjCO2tSB468EFZ0zoUlotSKKCV8dF97s7UtsMjJNMvKYDvb8l337iMsxXyzsU3lQr%2F%2BrKkPGMk9JM2AxW7OoIbGMqyEOOQ2VvJcsenMciTaQFZBEXuY77mlZE%2FmpuPBIuSHV0qKAJgFQOYSkRfCeb1B2QiZkRDRgbe9tSAAODxVb4GxAb2jeN7zYysmCC84ZATU8HimTRjVKctDKWkW6YOCuzSMVnOZIWqah4tMpPqnw9QcZcVlbdclcbmZzIo%2FG3N%2Bxuym777a26ox4piRyl9%2FiQs2ElD8lpvQjMN0Scaufya%2FGHDtBXY5wkWNDn7nAPUWr%2BcM%2BonEgjHzjryieAPVXoaZpe9pLpOQqCriM47TnScXAc7RXWTPv9opsNI7prZMkOvE5ztsyebA0e0VwhQyN6I%2FtAHQL4Lwix2bdqIfrofUJEoxOOBhZinY0tJUpkUWe2Vo5yzxe9%2FJDQTSbLoeSYcAmozEBlgr0xFSmNItV9zklBX%2FBq70pJKFez2c8PzT20VL5KwQp9RAB7jXH2iyxYwngrsjVNkh70ERkJ9jISRE5GOpiQhspHADiMVBJa7MDFcALHQW93djk5tLiH48R3OfEVJ%2B62%2Fb9yEvRSb7NxnY0T94SrObncdXJ%2BTtCRvety10lzZD0bJ2OHk6JMJbAvy6s0wZ%2FMZvZZ2lcNBg5geoEpzPPn3ZYKvRCOwaS3F05cjg%2FfYgcjGTokO2x07wwnLv924DwfrqchCUMnyrJmNUUBGn3Q2hmhTlwD4Ob9%2Bihgh3WKhgrrQI8D7YPAk1V16qLWeRz4%2B14GtAbPdSPra6e5ob35aaDnqEmqf3wjk2b7KKibt0%2Br8PY3
var matrixBlockSum = function (mat, k) {
  const m = mat.length,
    n = mat[0].length;
  let res = new Array(m).fill().map((_) => new Array(n).fill(0));

  const numMatrix = new NumMatrix(mat);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 左上角坐标（x1,y1）
      let x1 = Math.max(i - k, 0);
      let y1 = Math.max(j - k, 0);
      // 右下角的坐标
      let x2 = Math.min(i + k, m - 1);
      let y2 = Math.min(j + k, n - 1);
      res[i][j] = numMatrix.sumRegion(x1, y1, x2, y2);
    }
  }

  return res;
};
// 304题目
/**
 * @param {number[][]} matrix
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
