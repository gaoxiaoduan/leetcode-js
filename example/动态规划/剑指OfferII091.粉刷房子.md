## [剑指 Offer II 091. 粉刷房子](https://leetcode.cn/problems/JEj789/) <Badge type="warning">medium</Badge>

跟[256题](https://leetcode-cn.com/problems/paint-house/)相同

- 这道题有些类似 最长递增子序列 和 最大子数组和，因为它们定义 dp 数组的方式都是「以 xx 结尾的最值是 dp[i]」。
- 这道题对 dp 数组的定义是：
  - 当第 i 个房子粉刷颜色 j 时，粉刷 [0..i] 这些房子所需的最少花费为 dp[i][j]。
- 有了这个定义，题目想求的答案就是 `sum(dp[n-1][..])`。
- 又因为题目说相同的颜色不能相邻，所以状态转移方程为：

```
// 颜色 0 只能挨着颜色 1 或颜色 2
dp[i][0] = min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
// 颜色 1 只能挨着颜色 0 或颜色 2
dp[i][1] = min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
// 颜色 2 只能挨着颜色 0 或颜色 1
dp[i][2] = min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
```

```js
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const n = costs.length;
  // 定义dp数组
  // dp[i][j]表示[0...i]号房子，粉成0，1，2号颜色所需最少成本
  const dp = new Array(n).fill(0).map((_) => [0, 1, 2]);
  // base case
  // 第0排花费的最少成本就是costs[0][j]
  dp[0] = costs[0];

  for (let i = 1; i < n; i++) {
    // dp[i]的最小成本 = dp[i-1]的最小成本+当前层的成本
    // 因为相邻颜色不能相同,所以0颜色，只能选1，2颜色的最小成本 + 当前颜色成本
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
  }

  // 找出[0...i]号房子中花费最少的成本
  const res = Math.min.call(null, ...dp[n - 1]);
  return res;
};

```
