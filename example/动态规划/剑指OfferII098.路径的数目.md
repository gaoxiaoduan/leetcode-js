## [剑指 Offer II 098. 路径的数目](https://leetcode.cn/problems/2AoeFn/) <Badge type="warning">medium</Badge>

跟[62题](https://leetcode-cn.com/problems/unique-paths/)相同

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const memo = new Array(m + 1).fill(-1).map((_) => new Array(n).fill(-1));

  // 定义dp(i,j)
  // 返回0,0走到i,j的路径数量
  const dp = (i, j) => {
    // base case
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    // i,j点的数量和 = 到达左边的数量 + 到达上面的数量
    // dp(i,j)= dp(i-1,j) 的数量+dp(i,j-1)的数量
    memo[i][j] = dp(i - 1, j) + dp(i, j - 1);

    return memo[i][j];
  };

  return dp(m - 1, n - 1);
};

```
