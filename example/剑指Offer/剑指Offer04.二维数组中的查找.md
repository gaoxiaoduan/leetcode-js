## [剑指 Offer 04. 二维数组中的查找](https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/) <Badge type="warning">medium</Badge>

- 从右上角开始遍历（也可以选择从左下角开始遍历）
- 从右上角出发，向（下⬇️）是（增大）的， 向（左⬅️）是（变小）的
- [类似 240.搜索二维矩阵-ii](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  if (matrix.length === 0) return false;
  const m = matrix.length,
    n = matrix[0].length;

  // 初始化i,j为右上角元素
  let i = 0,
    j = n - 1;
  while (i < m && j >= 0) {
    if (matrix[i][j] === target) {
      return true;
    } else if (matrix[i][j] > target) {
      // 需要小一点，j--
      j--;
    } else if (matrix[i][j] < target) {
      // 需要大一点，i++
      i++;
    }
  }
  // 循环结束没找到，返回false
  return false;
};
```
