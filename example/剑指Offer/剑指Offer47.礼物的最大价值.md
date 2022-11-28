## [剑指 Offer 47. 礼物的最大价值](https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof/) <Badge type="warning">medium</Badge>

动态规划(自顶向下)
跟[64.最小路径和](/js-logs/dynamic-programming#64最小路径和)相似
不过这个是求最大，修改一下转移方程就行

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    const memo = new Array(m).fill().map(_ => new Array(n).fill(-1));

    // 返回[0,0] 到[i,j]的路径上的最大值
    const dp = (i, j) => {
        // base case
        if (i === 0 && j === 0) return grid[0][0];
        if (i < 0 || j < 0) return -Infinity;

        if (memo[i][j] !== -1) return memo[i][j];

        return memo[i][j] = Math.max(dp(i - 1, j), dp(i, j - 1)) + grid[i][j];
    }
    return dp(m - 1, n - 1);
};
```

自底向上（dp数组，动规）

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
    const m = grid.length, n = grid[0].length;
    // dp[i][j]表示从[0,0]到[i,j]点 路径上的最大值
    const dp = new Array(m).fill().map(_ => new Array(n).fill(0));

    // base case
    dp[0][0] = grid[0][0];
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }

    return dp[m - 1][n - 1];
};
```
